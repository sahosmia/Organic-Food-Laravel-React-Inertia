<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coupons = [
            [
                'code' => 'SUMMER25',
                'type' => 'percentage',
                'value' => 25.00,
                'min_amount' => 500.00,
                'max_uses' => 100,
                'uses' => 0,
                'starts_at' => Carbon::now()->subDays(7),
                'expires_at' => Carbon::now()->addMonths(1),
                'is_active' => true,
                'description' => 'Get 25% off on orders above ৳500.',
            ],
            [
                'code' => 'FLAT100',
                'type' => 'fixed_amount',
                'value' => 100.00,
                'min_amount' => 1000.00,
                'max_uses' => 50,
                'uses' => 0,
                'starts_at' => Carbon::now()->subDays(15),
                'expires_at' => Carbon::now()->addDays(30),
                'is_active' => true,
                'description' => 'Flat ৳100 off on orders above ৳1000.',
            ],
            [
                'code' => 'FREESHIP',
                'type' => 'free_shipping',
                'value' => 0.00,
                'min_amount' => 0.00,
                'max_uses' => null,
                'uses' => 0,
                'starts_at' => Carbon::now()->subMonth(1),
                'expires_at' => Carbon::now()->addMonths(3),
                'is_active' => true,
                'description' => 'Enjoy free delivery on all orders!',
            ],
            [
                'code' => 'EXPIRED10',
                'type' => 'percentage',
                'value' => 10.00,
                'min_amount' => 200.00,
                'max_uses' => 10,
                'uses' => 10,
                'starts_at' => Carbon::now()->subMonths(2),
                'expires_at' => Carbon::now()->subDays(1),
                'is_active' => false,
                'description' => 'Expired or fully used test coupon.',
            ],
        ];

        foreach ($coupons as $coupon) {
            Coupon::create($coupon);
        }

        $this->command->info('Coupons seeded successfully!');
    }
}
