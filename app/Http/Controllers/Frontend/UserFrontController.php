<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
class UserFrontController extends Controller
{
    /**
     * Display the home page with products.
     */
    public function index(Request $request)
    {
        $categories = Category::orderBy('created_at', 'desc')->limit(3)->get();
        $products = Product::active()->with(['category:title,id,slug'])
            ->orderBy('created_at', 'desc')
            ->limit(10)->get();

        return Inertia::render('frontend/home', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}

