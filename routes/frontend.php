<?php

use App\Http\Controllers\Frontend\{
    BlogFrontController,
    CartFrontController,
    CheckoutFrontController,
    CouponFrontController,
    HomeFrontController,
    OrderFrontController,
    PortfolioFrontController,
    ProductFrontController,
    ReviewFrontController,
    TeamController,
    UserFrontController,
    WishlistFrontController
};

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeFrontController::class, 'index'])->name('home');

Route::get('/shops', [ProductFrontController::class, 'index'])->name('product.index');
Route::get('/shops/{product}', [ProductFrontController::class, 'show'])->name('product.show');

Route::get('/categories', [ProductFrontController::class, 'index'])->name('categories.index');
Route::get('/categories/{category}', [ProductFrontController::class, 'show'])->name('categories.show');

Route::get('/teams', [TeamController::class, 'index'])->name('team.index');

Route::get('/portfolios', [PortfolioFrontController::class, 'index'])->name('portfolio.index');
Route::get('/portfolios/{id}', [PortfolioFrontController::class, 'show'])->name('portfolio.show');

Route::get('/blogs', [BlogFrontController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{id}', [BlogFrontController::class, 'show'])->name('blogs.show');


Route::get('/orders', [OrderFrontController::class, 'index'])->name('orders.index');
Route::get('/wishlist', [WishlistFrontController::class, 'index'])->name('wishlist.index');
Route::get('/settings', [UserFrontController::class, 'settings'])->name('settings.index');

Route::middleware(['auth'])->group(function () {
    // cart
    Route::get('/cart', [CartFrontController::class, 'index'])->name('cart.index');

    // add to cart
    Route::post('/cart/add', [CartFrontController::class, 'addToCart'])
        ->name('cart.add');

    // delete from cart
    Route::get('/cart/delete/{product}', [ProductFrontController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart/delete/{product}', [CartFrontController::class, 'remove'])->name('cart.remove');

    // update cart
    Route::post('/cart/update', [ProductFrontController::class, 'updateCart'])->name('cart.update');
    Route::put('/cart/update/{id}', [CartFrontController::class, 'updateQuantity'])->name('cart.update');

    Route::post('/apply-coupon', [CouponFrontController::class, 'index'])->name('apply.coupon');



    // // checkout
    // Route::get('/checkout', function () {
    //     return Inertia::render('Checkout/Index');
    // })->name('checkout.index');



    Route::get('/checkout', [CheckoutFrontController::class, 'index'])->name('checkout.index');
    Route::post('/place-order', [CheckoutFrontController::class, 'store'])->name('checkout.place-order');

    // order confirmation
    Route::get('/order-confirmation', function () {
        return Inertia::render('Checkout/OrderConfirmation');
    })->name('checkout.order-confirmation');

    Route::post('/reviews', [ReviewFrontController::class, 'store'])->name('reviews.store');
});
