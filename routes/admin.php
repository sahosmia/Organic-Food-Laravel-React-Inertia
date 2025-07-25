<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Order\CouponController;
use App\Http\Controllers\Admin\Order\OrderController;
use App\Http\Controllers\Admin\Product\ProductController;
use App\Http\Controllers\Admin\Product\CategoryController;
use App\Http\Controllers\Admin\User\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin/')->name('admin.')->middleware(['auth', 'verified'])->group(function(){

  // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

  // Product Management Module
    Route::prefix('product-module/')->name('product_m.')->group(function(){
        Route::resource('products', ProductController::class); // Assuming all actions needed for admin
        Route::resource('categories', CategoryController::class);
        // Route::resource('brands', BrandController::class);
        // Route::resource('attributes', AttributeController::class); // Added for Product Attributes
        // Route::resource('reviews', ProductReviewController::class)->only(['index', 'show', 'update', 'destroy']); // Reviews typically listed, viewed, approved/rejected, deleted
        // Route::get('inventory', [ProductStockController::class, 'index'])->name('inventory.index'); // For Stock/Inventory list
        // Route::put('inventory/{product}/update-stock', [ProductStockController::class, 'updateStock'])->name('inventory.updateStock'); // For updating stock
    });

   // User Management Module
    Route::prefix('user-module/')->name('user_m.')->group(function(){
        Route::resource('users', UserController::class); // All resource methods included
        Route::put('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggleStatus');
        Route::delete('/users/bulk-destroy', [UserController::class, 'bulkDestroy'])->name('users.bulkDestroy');

        // Route::resource('roles', RoleController::class); // Added for User Roles
        // Route::resource('permissions', PermissionController::class); // Added for User Permissions
    });

    // Order Management Module
    Route::prefix('order-module/')->name('order_m.')->group(function(){
        Route::resource('orders', OrderController::class); // All resource methods included for orders
        // Route::get('orders/{order}/print', [OrderController::class, 'print'])->name('orders.print');
        // Route::get('orders/pending', [OrderController::class, 'pendingOrders'])->name('orders.pending'); // Added for Pending Orders
        // Route::get('orders/completed', [OrderController::class, 'completedOrders'])->name('orders.completed'); // Added for Completed Orders
        // Route::get('orders/cancelled', [OrderController::class, 'cancelledOrders'])->name('orders.cancelled'); // Added for Cancelled Orders

        Route::resource('coupons', CouponController::class);
        Route::put('coupons/{coupon}/toggle-status', [CouponController::class, 'toggleStatus'])->name('coupons.toggleStatus');

        // Route::resource('refunds', RefundController::class)->except(['create', 'store']); // Refunds usually managed, not created from scratch by admin
    });





});


// Route::prefix('content-communication-module/')->name('content_c.')->group(function(){
//     // Route::resource('blogs', BlogController::class)->except(['create', 'edit']);
//     // Route::resource('reviews', ReviewController::class)->except(['create', 'edit']);
//     // Route::resource('contact-forms', ContactFormController::class)->only(['index', 'show', 'destroy']);
//     // Route::resource('faqs', FaqController::class)->except(['create', 'edit']);
// });

// Route::prefix('portfolio-team-module/')->name('portfolio_t.')->group(function(){
//     // Route::resource('portfolios', PortfolioController::class)->except(['create', 'edit']);
//     // Route::resource('teams', TeamController::class)->except(['create', 'edit']);
// });

// Route::prefix('utility-module/')->name('utility.')->group(function(){
//     // Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
//     // Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
//     // Route::get('system-logs', [LogViewerController::class, 'index'])->name('logs.index');
// });
