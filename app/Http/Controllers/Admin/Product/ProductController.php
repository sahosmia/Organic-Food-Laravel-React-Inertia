<?php
namespace App\Http\Controllers\Admin\Product;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller {

    public function index(Request $request){
        $products = Product::with('category')->get();
        return Inertia::render('Admin/product/index', [
            'products' => $products,
        ]);
    }

}
