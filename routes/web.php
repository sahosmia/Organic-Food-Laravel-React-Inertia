<?php

use App\Http\Controllers\Frontend\{
    BlogFrontController,
    CartFrontController,
    HomeFrontController,
    PortfolioFrontController,
    ProductFrontController,
    ReviewFrontController,
    TeamFrontController
};

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;









Route::middleware(['auth', 'verified'])->group(function () {
  

    Route::get('admin/products', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('admin/product2', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('admin/product3', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    });

require __DIR__.'/admin.php';
require __DIR__.'/frontend.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
