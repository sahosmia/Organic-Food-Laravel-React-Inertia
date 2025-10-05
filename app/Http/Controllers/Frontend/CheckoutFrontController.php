<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;

class CheckoutFrontController extends Controller{


  public function index()
    {
        
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->discounted_price;
        });

        return Inertia::render('frontend/Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }


    // checkout place order
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'address_line_1' => 'required|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'required|string|max:100',
            'district' => 'required|string|max:100',
            'post_code' => 'required|string|max:20',
            'payment_method' => 'required|string',
        ]);

        $user = Auth::user();
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->discounted_price;
        });

        $discountAmount = 0;
        $coupon = null;
        $couponCode = Cookie::get('coupon');

        if ($couponCode) {
            $coupon = Coupon::where('coupon_code', $couponCode)->first();
            if ($coupon && $coupon->isApplicable($subtotal)) {
                 if ($coupon->discount_type === 'percentage') {
                    $discountAmount = ($subtotal * $coupon->discount_value) / 100;
                } else {
                    $discountAmount = $coupon->discount_value;
                }
            }
        }

        $shippingCharge = 5.00;
        $totalAmount = $subtotal - $discountAmount + $shippingCharge;

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => $user->id,
                'coupon_id' => $coupon?->id,
                'total_amount' => $totalAmount,
                'discount_amount' => $discountAmount,
                'shipping_charge' => $shippingCharge,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'payment_status' => 'unpaid',
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address_line_1' => $request->address_line_1,
                'address_line_2' => $request->address_line_2,
                'city' => $request->city,
                'district' => $request->district,
                'post_code' => $request->post_code,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->product->discounted_price,
                    'subtotal' => $item->quantity * $item->product->discounted_price,
                ]);
            }

            if ($coupon) {
                $coupon->increment('used_count');
            }

            Cart::where('user_id', $user->id)->delete();
            Cookie::queue(Cookie::forget('coupon'));

            DB::commit();

            return redirect()->route('checkout.order-confirmation')->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('cart.index')->with('error', 'Failed to place order. Please try again.');
        }
    }
}