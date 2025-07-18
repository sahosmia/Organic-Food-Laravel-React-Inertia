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
        $coupon = Coupon::where('code', $couponCode)
            ->active()
            ->where('expires_at', '>', now())
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

        if ($coupon->max_uses !== null && $coupon->uses >= $coupon->max_uses) {


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

        if ($cartSubtotal < $coupon->min_amount) {
            $appDomain = Config::get('app.domain');
            $forgottenCookie = Cookie::forget('coupon', '/', $appDomain);
            return response()->json([
                'code' => $couponCode,
                "coupon" => null,
                'coupon_result' => [
                    'discount_amount' => 0,
                    'is_free_shipping' => false,
                    'message' => "Minimum purchase of $" . number_format($coupon->min_amount, 2) . " required for this coupon.",
                ],
            ])->withCookie($forgottenCookie);
        }
        Cookie::queue('coupon', $couponCode, 120);


        switch ($coupon->type) {
            case 'fixed_amount':
                $discountAmount = min($coupon->value, $cartSubtotal);
                $message = "Fixed discount of $" . number_format($discountAmount, 2) . " applied.";
                break;

            case 'percentage':
                $discountAmount = ($cartSubtotal * $coupon->value) / 100;
                $discountAmount = min($discountAmount, $coupon->max_discount_amount ?? $discountAmount);
                $discountAmount = min($discountAmount, $cartSubtotal);
                $message = "Percentage discount of " . $coupon->value . "% applied.";
                break;

            case 'free_shipping':
                $isFreeShipping = true;
                $message = "Free shipping applied!";
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
            'code' => $request->couponCode,
            "coupon" => $coupon,
            'coupon_result' => [
                'discount_amount' => $discountAmount,
                'is_free_shipping' => $isFreeShipping,
                'message' => $message,
            ],
        ]);
    }
}
