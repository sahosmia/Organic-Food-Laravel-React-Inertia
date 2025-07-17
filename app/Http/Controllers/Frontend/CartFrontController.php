<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Coupon;

class CartFrontController extends Controller
{
    /**
     * Display the cart page.
     */
    public function index()
    {
        $cartItems = Cart::where('user_id', Auth::id())
            ->with('product')
            ->get();
        $appliedCoupon = session('applied_coupon'); // সেশন থেকে প্রয়োগকৃত কুপন আনুন



        return inertia('frontend/Cart', [
            'cartItems' => $cartItems,
            'initialCouponData' => $appliedCoupon, // কুপনের ডেটা ফ্রন্টএন্ডে পাঠান

        ]);
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


    public function applyCoupon(Request $request)
    {
        $request->validate([
            'code' => 'required|string|max:255',
        ]);

        $couponCode = $request->code;
        $cartItems = Cart::where('user_id', Auth::id())
            ->with('product')
            ->get();



        $discountAmount = 0;
        $isFreeShipping = false;
        $message = '';

        // Find Coupon form model
        $coupon = Coupon::where('code', $couponCode)
            ->where('is_active', true)
            ->where('expires_at', '>', now())
            ->first();



        if (!$coupon) {
            // return redirect()->back()->withErrors(['coupon_code' => 'Invalid or expired coupon.'])->with([
            //     'flash' => [
            //         'coupon_result' => [
            //             'discount_amount' => 0,
            //             'is_free_shipping' => false,
            //             'message' => 'Invalid or expired coupon.',
            //         ],
            //     ],
            // ]);

            return response()->json([
                'code' => $couponCode,
                'message' => 'hello',
            "request" => $request->code,
                "coupon" => $coupon,
                'coupon_result' => [
                    'discount_amount' => 0,
                    'is_free_shipping' => false,
                    'message' => 'Invalid or expired coupon.',
                ],
            ]);
        }

                $cartSubtotal = collect($cartItems)->sum(fn($item) => $item['quantity'] * $item['product']['discounted_price']);




        if ($coupon->type === 'fixed_amount') {
            $discountAmount = min($coupon->value, $cartSubtotal); // সাবটোটালের বেশি ডিসকাউন্ট হবে না
            $message = "Fixed discount of $" . number_format($discountAmount, 2) . " applied.";
        } elseif ($coupon->type === 'percentage') {
            $discountAmount = ($cartSubtotal * $coupon->value) / 100;
            $discountAmount = min($discountAmount, $coupon->max_discount_amount ?? $discountAmount); // যদি সর্বোচ্চ ডিসকাউন্ট থাকে
            $message = "Percentage discount of " . $coupon->value . "% applied.";
        } elseif ($coupon->type === 'free_shipping') {
            $isFreeShipping = true;
            $message = "Free shipping applied!";
        }

        // কুপনের ব্যবহার সীমা চেক করুন (ঐচ্ছিক)
        // if ($coupon->usage_limit && $coupon->usage_count >= $coupon->usage_limit) {
        //     // কুপন ব্যবহার সীমা অতিক্রম করেছে
        // }

        // কুপন সেশনে বা ডেটাবেজে সংরক্ষণ করুন যাতে চেকআউটে ব্যবহার করা যায়
        session()->put('applied_coupon', [
            'code' => $coupon->code,
            'discount_amount' => $discountAmount,
            'is_free_shipping' => $isFreeShipping,
        ]);

        return response()->json([
            'cartSubtotal'=> $cartSubtotal,
            'code' => $request->couponCode,
            'message' => $message,
            "request" => $request->code,
            "coupon" => $coupon,
            'coupon_result' => [
                'discount_amount' => $discountAmount,
                'is_free_shipping' => $isFreeShipping,
                'message' => $message,
            ],
        ]);
    }
}
