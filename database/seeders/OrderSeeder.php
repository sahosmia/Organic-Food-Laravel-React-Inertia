<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $users = User::all();
        $coupons = Coupon::all();





        $ordersData = [
            [
                'user_id' => $users->random()->id,
                'coupon_id' => null,
                'discount_amount' => 0.00,
                'shipping_charge' => 60.00,
                'total_amount' => 560.00,
                'status' => 'delivered',
                'payment_method' => 'COD',
                'payment_status' => 'paid',
                'order_date' => Carbon::now()->subDays(10),
                'name' => 'Sample User One',
                'phone' => '01711223344',
                'email' => 'sample1@example.com',
                'address_line_1' => 'Road 1, House 1',
                'address_line_2' => 'Block A',
                'city' => 'Dhaka',
                'district' => 'Dhaka',
                'post_code' => '1212',

            ],
            [
                'user_id' => $users->random()->id,
                'coupon_id' => ($coupon = $coupons->where('type', 'percentage')->first()) ? $coupon->id : null,
                'discount_amount' => 120.00,
                'shipping_charge' => 60.00,
                'total_amount' => 1040.00,
                'status' => 'processing',
                'payment_method' => 'Bkash',
                'payment_status' => 'paid',
                'order_date' => Carbon::now()->subDays(5),
                'name' => 'Sample User Two',
                'phone' => '01888999000',
                'email' => 'sample2@example.com',
                'address_line_1' => 'Street 2, Apartment 5',
                'address_line_2' => 'Area B',
                'city' => 'Chattogram',
                'district' => 'Chattogram',
                'post_code' => '4000',

            ],
            [
                'user_id' => $users->random()->id,
                'coupon_id' => ($coupon = $coupons->where('type', 'free_shipping')->first()) ? $coupon->id : null,
                'discount_amount' => 0.00,
                'shipping_charge' => 80.00,
                'total_amount' => 700.00,
                'status' => 'pending',
                'payment_method' => 'Card',
                'payment_status' => 'pending',
                'order_date' => Carbon::now()->subHours(12),
                'name' => 'Sample User Three',
                'phone' => '01911223344',
                'email' => 'sample3@example.com',
                'address_line_1' => 'Lane 3, House 7',
                'address_line_2' => 'Sector C',
                'city' => 'Khulna',
                'district' => 'Khulna',
                'post_code' => '9000',

            ],
        ];

        foreach ($ordersData as $order) {
            Order::create($order);
        }

        $this->command->info('Orders seeded successfully (without items).');

    }
}
