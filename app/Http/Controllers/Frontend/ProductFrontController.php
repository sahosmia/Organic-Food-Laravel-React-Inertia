<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ProductFrontController extends Controller
{
    /**
     * Display the home page with products.
     */
    public function index(Request $request)
    {
        $products = Product::active()->with(['category:title,id,slug'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('frontend/product', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        // Ensure the product is active
        if (!$product->is_active) {
            abort(404);
        }

        return Inertia::render('frontend/ShopDetails', [
            'product' => $product,
        ]);
    }
}

