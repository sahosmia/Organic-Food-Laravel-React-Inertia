<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Cart;


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

        return Inertia::render('frontend/Cart', [
            'cartsItems' => $cartItems,
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
}
