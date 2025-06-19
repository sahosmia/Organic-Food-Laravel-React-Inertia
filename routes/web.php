<?php

use App\Http\Controllers\Frontend\CartFrontController;
use App\Http\Controllers\Frontend\HomeFrontController;
use App\Http\Controllers\Frontend\ProductFrontController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeFrontController::class, 'index'])->name('home');

Route::get('/shops', [ProductFrontController::class, 'index'])->name('product.index');
Route::get('/shops/{product}', [ProductFrontController::class, 'show'])->name('product.show');

Route::get('/categories', [ProductFrontController::class, 'index'])->name('categories.index');
Route::get('/categories/{category}', [ProductFrontController::class, 'show'])->name('categories.show');

Route::middleware(['auth'])->group(function () {
   // cart 
    Route::get('/cart', function () {
          return Inertia::render('Cart/Index');
     })->name('cart.index');
    
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
});




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
