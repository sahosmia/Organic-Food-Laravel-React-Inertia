<?php

use App\Http\Controllers\Frontend\HomeFrontController;
use App\Http\Controllers\Frontend\ProductFrontController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeFrontController::class, 'index'])->name('home');

Route::get('/shops', [ProductFrontController::class, 'index'])->name('product.index');
Route::get('/shops/{product}', [ProductFrontController::class, 'show'])->name('product.show');

Route::get('/categories', [ProductFrontController::class, 'index'])->name('categories.index');
Route::get('/categories/{category}', [ProductFrontController::class, 'show'])->name('categories.show');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
