<?php

namespace App\Http\Controllers\Admin\Order;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\Order\StoreCouponRequest;
use App\Http\Requests\Order\UpdateCouponRequest;
use App\Models\Coupon;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');
        $status = $request->input('status'); // e.g., 'active', 'inactive', 'expired', 'upcoming'

        $coupons = Coupon::query()
            ->when($search, function ($query, $search) {
                $query->where('coupon_code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                if ($status === 'active') {
                    $query->where('is_active', true)
                        ->where(function ($q) {
                            $q->whereNull('start_date')
                                ->orWhere('start_date', '<=', now());
                        })
                        ->where(function ($q) {
                            $q->whereNull('end_date')
                                ->orWhere('end_date', '>', now());
                        })
                        ->where(function ($q) {
                            $q->whereNull('usage_limit')
                                ->orWhereColumn('used_count', '<', 'usage_limit');
                        });
                } elseif ($status === 'inactive') {
                    $query->where('is_active', false);
                } elseif ($status === 'expired') {
                    $query->whereNotNull('end_date')
                        ->where('end_date', '<=', now());
                } elseif ($status === 'upcoming') {
                    $query->whereNotNull('start_date')
                        ->where('start_date', '>', now());
                }
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return Inertia::render('admin/order-module/coupon/index', [
            'coupons' => $coupons,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/order-module/coupon/create');
    }


    public function store(StoreCouponRequest $request)
    {
        $validatedData = $request->validated();

        // return $validatedData;
        // Ensure boolean conversion for `is_active`
        // $validatedData['is_active'] = $request->boolean('is_active');

        // `uses` field defaults to 0 as per schema, no need to set explicitly unless non-zero initial value is intended

        Coupon::create($validatedData);

        return redirect()->route('admin.order_m.coupons.index')->with('success', 'Coupon created successfully.');
    }

    public function show(Coupon $coupon)
    {
        return Inertia::render('admin/order-module/coupon/show', [
            'coupon' => $coupon,
        ]);
    }


    public function edit(Coupon $coupon)
    {
        return Inertia::render('admin/order-module/coupon/edit', [
            'coupon' => $coupon,
        ]);
    }


    public function update(UpdateCouponRequest $request, Coupon $coupon)
    {
        $validatedData = $request->validated();

        // Ensure boolean conversion for `is_active`
        $validatedData['is_active'] = $request->boolean('is_active');

        $coupon->update($validatedData);

        return redirect()->route('admin.order_m.coupons.index')->with('success', 'Coupon updated successfully.');
    }




    public function destroy(Coupon $coupon)
    {
        $coupon->delete();

        return redirect()->route('admin.order_m.coupons.index')->with('success', 'Coupon deleted successfully.');
    }

     public function toggleStatus(Coupon $coupon)
    {
        $coupon->is_active = !$coupon->is_active;
        $coupon->save();

        return redirect()->back()->with('success', 'Coupon status updated successfully.');
    }
}
