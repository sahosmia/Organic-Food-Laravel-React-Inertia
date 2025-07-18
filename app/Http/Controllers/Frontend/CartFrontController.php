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

        $coupon = Coupon::where('code', $couponCode)
            ->active()
            ->where('expires_at', '>', now())
            ->first();
        // uses limit check with max_uses




        $discountAmount = 0;
        $shipping = false;
        $message = "";





        $cookieToSend = null;


        if ($coupon) {


            switch ($coupon->type) {
                case "fixed_amount":
                    if ($rounded_subtotal >= $coupon->min_amount) {
                        $discountAmount = min($coupon->value, $rounded_subtotal);
                        // $message = "Fixed discount of $" . number_format($discountAmount, 2) . " applied.";
                    } else {
                        $message = "Minimum purchase amount of $" . number_format($coupon->min_amount, 2) . " not met for this coupon.";
                    }
                    break;

                case "percentage":
                    if ($rounded_subtotal >= $coupon->min_amount) {
                        $discountAmount = $rounded_subtotal * ($coupon->value / 100);
                        $discountAmount = min($discountAmount, $rounded_subtotal);
                        // $message = "Percentage discount of " . $coupon->value . "% applied.";
                    } else {
                        $message = "Minimum purchase amount of $" . number_format($coupon->min_amount, 2) . " not met for this coupon.";
                    }
                    break;

                case 'free_shipping':
                    if ($rounded_subtotal >= $coupon->min_amount) {
                        $shipping = true;
                        $message = "Free shipping applied!";
                    } else {
                        $message = "Minimum purchase amount of $" . number_format($coupon->min_amount, 2) . " not met for free shipping.";
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
            $cookieToSend = Cookie::forget('coupon', '/', $appDomain); // Prepare to remove the cookie
        }

        $appliedCouponData = [
            'coupon' => $coupon, // Will be null if coupon was invalid or forgotten
            'discountAmount' => round($discountAmount, 2), // Ensure discount is rounded
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
