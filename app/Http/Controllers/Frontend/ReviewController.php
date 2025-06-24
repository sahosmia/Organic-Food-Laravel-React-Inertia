<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Review;

class ReviewController extends Controller{

    public function store(Request $request)
    {
// check this user buy the product or not

        $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        // 2. Create the review
        Review::create([
            'product_id' => $request->product_id,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
            'approved' => false,
            'approved_at' => null,
        ]);

        // 3. Redirect back or respond with success
        return redirect()->back()->with('success', 'Your review has been submitted successfully and is awaiting approval!');


    }
}
