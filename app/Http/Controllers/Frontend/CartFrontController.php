<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Coupon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Illuminate\Http\Response;


class CartFrontController extends Controller
{
    /**
     * Display the cart page.
     */
    public function index(Request $request)
    {
        $cartItems = Cart::where('user_id', Auth::id())
            ->with('product')
            ->get();

        $cartSubtotal = collect($cartItems)->sum(fn($item) => $item['quantity'] * $item['product']['discounted_price']);
        $rounded_subtotal = round($cartSubtotal, 2);

        $couponCode = $request->cookie('coupon');

        $coupon = Coupon::where('coupon_code', $couponCode)
            ->active()
            ->where('end_date', '>', now())
            ->first();

        $discountAmount = 0;
        $shipping = false;
        $message = "";

        $cookieToSend = null;

        if ($coupon) {
            switch ($coupon->discount_type) {
                case "fixed_amount":
                    if ($rounded_subtotal >= $coupon->min_order_amount) {
                        $discountAmount = min($coupon->discount_value, $rounded_subtotal);
                    } else {
                        $message = "Minimum purchase amount of $" . number_format($coupon->min_order_amount, 2) . " not met for this coupon.";
                    }
                    break;

                case "percentage":
                    if ($rounded_subtotal >= $coupon->min_order_amount) {
                        $discountAmount = $rounded_subtotal * ($coupon->discount_value / 100);
                        $discountAmount = min($discountAmount, $rounded_subtotal);
                    } else {
                        $message = "Minimum purchase amount of $" . number_format($coupon->min_order_amount, 2) . " not met for this coupon.";
                    }
                    break;

                default:
                    $message = "Unknown coupon type.";
                    $appDomain = Config::get('app.domain');
                    $cookieToSend = Cookie::forget('coupon', '/', $appDomain);
                    $coupon = null;
                    break;
            }
        } else {
            $appDomain = Config::get('app.domain');
            $cookieToSend = Cookie::forget('coupon', '/', $appDomain);
        }

        $appliedCouponData = [
            'coupon' => $coupon,
            'discountAmount' => round($discountAmount, 2),
            'shipping' => $shipping,
            'message' => $message,
        ];

        // Prepare the Inertia response
        $inertiaResponse = Inertia::render('frontend/Cart', [
            'cartItems' => $cartItems,
            'appliedCoupon' => $appliedCouponData,
        ]);

        // Attach the cookie if one was prepared for sending (e.g., to be forgotten)
        if ($cookieToSend) {
            /** @var \Illuminate\Http\Response $httpResponse */
            $httpResponse = $inertiaResponse->toResponse($request);
            return $httpResponse->withCookie($cookieToSend);
        }

        // Otherwise, return the Inertia response directly
        return $inertiaResponse;
    }

    /**
     * Add a product to the cart.
     */
    public function addToCart(Request $request)
    {


        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $product = Product::findOrFail($request->product_id);
        $quantity = $request->quantity;

        $cartItem = Cart::firstOrNew([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
        ]);

        $cartItem->exists ? $cartItem->quantity += $quantity : $cartItem->quantity = $quantity;

        $cartItem->save();
        return back()->with('success', 'Product added to cart successfully!');
    }

    public function remove($id)
    {
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart.');
    }

    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return back()->with('success', 'Cart updated.');
    }



}
