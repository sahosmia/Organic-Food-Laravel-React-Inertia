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
        $products = Product::active()->with(['category:title,id,slug', 'reviews'])
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

        // Load the category, reviews relationship
        $product->load(['category:title,id,slug', 'reviews.user']);

        // products get by category and randomly with 4 limit
        $products = Product::active()
            ->with(['category:title,id,slug','reviews'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id) // Exclude the current product
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('frontend/ShopDetails', [
            'product' => $product,
            'relatedProducts' => $products,
        ]);
    }
}

