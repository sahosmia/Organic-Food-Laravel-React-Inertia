<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Product\{
    CategoryController,
    ProductController
};
use App\Http\Controllers\Admin\User\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin/')->name('admin.')->middleware(['auth', 'verified'])->group(function(){

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');



    Route::prefix('product-module/')->name('product_m.')->group(function(){
        Route::resource('products', ProductController::class)->except(['create', 'edit']);
        Route::resource('categories', CategoryController::class);
    });



    Route::prefix('user-module/')->name('user_m.')->group(function(){

        Route::resource('users', UserController::class)->except(['']);
        Route::put('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])
        ->name('users.toggleStatus');

        Route::delete('/users/bulk-destroy', [UserController::class, 'bulkDestroy'])
        ->name('users.bulkDestroy');


        // Route::resource('roles', RoleController::class)->except(['create', 'edit']);
    });




    Route::prefix('order-module/')->name('order_m.')->group(function(){
        // Route::resource('orders', OrderController::class)->except(['create', 'edit']);
        // Route::get('orders/{order}/print', [OrderController::class, 'print'])->name('orders.print');
    });




    Route::prefix('marketing-sales-module/')->name('marketing_s.')->group(function(){
        // Route::resource('discounts', DiscountController::class)->except(['create', 'edit']);
        // Route::resource('coupons', CouponController::class)->except(['create', 'edit']);
    });




    Route::prefix('content-communication-module/')->name('content_c.')->group(function(){
        // Route::resource('blogs', BlogController::class)->except(['create', 'edit']);
        // Route::resource('reviews', ReviewController::class)->except(['create', 'edit']);
        // Route::resource('contact-forms', ContactFormController::class)->only(['index', 'show', 'destroy']);
        // Route::resource('faqs', FaqController::class)->except(['create', 'edit']);
    });

    Route::prefix('portfolio-team-module/')->name('portfolio_t.')->group(function(){
        // Route::resource('portfolios', PortfolioController::class)->except(['create', 'edit']);
        // Route::resource('teams', TeamController::class)->except(['create', 'edit']);
    });

    Route::prefix('utility-module/')->name('utility.')->group(function(){
        // Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
        // Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
        // Route::get('system-logs', [LogViewerController::class, 'index'])->name('logs.index');
    });

});


