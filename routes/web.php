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
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/frontend.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
