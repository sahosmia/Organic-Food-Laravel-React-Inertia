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


class CouponFrontController extends Controller
{



    public function index(Request $request)
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
        $errorMessage = '';

        // Find Coupon form model
        $coupon = Coupon::where('coupon_code', $couponCode)
            ->active()
            ->where('end_date', '>', now())
            ->first();



        if (!$coupon) {
            $appDomain = Config::get('app.domain');
            $forgottenCookie = Cookie::forget('coupon', '/', $appDomain);

            return response()->json([
                'code' => $couponCode,
                "coupon" => null,
                'coupon_result' => [
                    'discount_amount' => 0,
                    'is_free_shipping' => false,
                    'message' => 'Invalid or expired coupon.',
                ],
            ])->withCookie($forgottenCookie);
        }

        if ($coupon->usage_limit !== null && $coupon->used_count >= $coupon->usage_limit) {


            return response()->json([
                'code' => $couponCode,
                "coupon" => null,
                'coupon_result' => [
                    'discount_amount' => 0,
                    'is_free_shipping' => false,
                    'message' => 'This coupon has reached its maximum usage limit.',
                ],
            ]);
        }



        $cartSubtotal = collect($cartItems)->sum(fn($item) => $item['quantity'] * $item['product']['discounted_price']);

        if ($cartSubtotal < $coupon->min_order_amount) {
            $appDomain = Config::get('app.domain');
            $forgottenCookie = Cookie::forget('coupon', '/', $appDomain);
            return response()->json([
                'code' => $couponCode,
                "coupon" => null,
                'coupon_result' => [
                    'discount_amount' => 0,
                    'is_free_shipping' => false,
                    'message' => "Minimum purchase of $" . number_format($coupon->min_order_amount, 2) . " required for this coupon.",
                ],
            ])->withCookie($forgottenCookie);
        }
        Cookie::queue('coupon', $couponCode, 120);


        switch ($coupon->discount_type) {
            case 'fixed_amount':
                $discountAmount = min($coupon->discount_value, $cartSubtotal);
                $message = "Fixed discount of $" . number_format($discountAmount, 2) . " applied.";
                break;

            case 'percentage':
                $discountAmount = ($cartSubtotal * $coupon->discount_value) / 100;
                $discountAmount = min($discountAmount, $cartSubtotal);
                $message = "Percentage discount of " . $coupon->discount_value . "% applied.";
                break;

            default:
                $appDomain = Config::get('app.domain');
                $forgottenCookie = Cookie::forget('coupon', '/', $appDomain);

                return response()->json([
                    'code' => $couponCode,
                    "coupon" => null,
                    'coupon_result' => [
                        'discount_amount' => 0,
                        'is_free_shipping' => false,
                        'message' => 'Invalid coupon type.',
                    ],
                ])->withCookie($forgottenCookie);
        }







        return response()->json([
            'cartSubtotal' => $cartSubtotal,
            'code' => $request->code,
            "coupon" => $coupon,
            'coupon_result' => [
                'discount_amount' => $discountAmount,
                'is_free_shipping' => $isFreeShipping,
                'message' => $message,
            ],
        ]);
    }
}
