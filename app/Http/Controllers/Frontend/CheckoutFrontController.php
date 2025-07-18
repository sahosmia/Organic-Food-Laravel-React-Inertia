<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutFrontController extends Controller{


  public function index()
    {
        
        $cartItems = Cart::where('user_id', Auth::id())->with('product')->get();

        $total = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });

        return Inertia::render('frontend/Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }


    // checkout place order
    public function store(Request $request)
    {

     $data = $request->validate([
        'name' => 'required|string|max:100',
        'last_name' => 'required|string|max:100',
        'email' => 'required|email|max:255',
        'phone_number' => 'required|string|max:20',
        'address' => 'required|string|max:255',
        // 'city' => 'required|string|max:100',
        // 'postal_code' => 'required|string|max:20',
        // 'order_notes' => 'nullable|string',
        // 'delivery_charge' => 'required|numeric|min:0',
    ]);

 // store order

 // store order item
 // delete cart
 // store address
 // delete coupon
 // incriment coupon uses

 return $data;

 die();

    // Clear user's cart
    Cart::where('user_id', Auth::id())->delete();

    return redirect()->route('checkout')->with('success', 'Order placed successfully!');
    }
}
