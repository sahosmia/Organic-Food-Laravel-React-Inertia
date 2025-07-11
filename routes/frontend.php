<?php

use App\Http\Controllers\Frontend\{
    BlogFrontController,
    CartFrontController,
    HomeFrontController,
    PortfolioFrontController,
    ProductFrontController,
    ReviewFrontController,
    TeamController
};

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeFrontController::class, 'index'])->name('home');

Route::get('/shops', [ProductFrontController::class, 'index'])->name('product.index');
Route::get('/shops/{product}', [ProductFrontController::class, 'show'])->name('product.show');

Route::get('/categories', [ProductFrontController::class, 'index'])->name('categories.index');
Route::get('/categories/{category}', [ProductFrontController::class, 'show'])->name('categories.show');

Route::get('/teams', [TeamController::class, 'index'])->name('team.index');

Route::get('/portfolios', [ProductFrontController::class, 'index'])->name('portfolio.index');
Route::get('/portfolios/{portfolio}', [PortfolioFrontController::class, 'show'])->name('portfolio.show');

Route::get('/blogs', [BlogFrontController::class, 'index'])->name('blogs.index');
Route::get('/blogs', [BlogFrontController::class, 'show'])->name('blogs.show');

Route::get('/blogs', [BlogFrontController::class, 'show'])->name('blogs.show');



Route::middleware(['auth'])->group(function () {
   // cart
    Route::get('/cart', [CartFrontController::class, 'index'])->name('cart.index');

     // add to cart
    Route::post('/cart/add', [CartFrontController::class, 'addToCart'])
    ->name('cart.add');

    // delete from cart
    Route::get('/cart/delete/{product}', [ProductFrontController::class, 'deleteFromCart'])->name('cart.delete');
    // update cart
    Route::post('/cart/update', [ProductFrontController::class, 'updateCart'])->name('cart.update');

    // checkout
    Route::get('/checkout', function () {
        return Inertia::render('Checkout/Index');
    })->name('checkout.index');
    // order confirmation
    Route::get('/order-confirmation', function () {
        return Inertia::render('Checkout/OrderConfirmation');
    })->name('checkout.order-confirmation');

    Route::post('/reviews', [ReviewFrontController::class, 'store'])->name('reviews.store');

});
