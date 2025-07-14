<?php

namespace Database\Seeders;

use App\Models\ShippingRate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShippingRateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shipping_rates = [
            [
                'zone_name' => 'Dhaka Metro (0-1kg)',
                // 'min_weight_kg' => 0.00,
                'max_weight_kg' => 1.00,
                'rate_per_kg' => 0.00,
                'base_rate' => 80.00,
                'delivery_time_days' => '1-2 days',
                'is_active' => true,
            ],
            [
                'zone_name' => 'Dhaka Metro (1kg+)',
                // 'min_weight_kg' => 1.01,
                'max_weight_kg' => 0,
                'rate_per_kg' => 20.00,
                'base_rate' => 80.00,
                'delivery_time_days' => '1-2 days',
                'is_active' => true,
            ],
            [
                'zone_name' => 'Outside Dhaka (0-1kg)',
                // 'min_weight_kg' => 0.00,
                'max_weight_kg' => 1.00,
                'rate_per_kg' => 0.00,
                'base_rate' => 120.00,
                'delivery_time_days' => '3-5 days',
                'is_active' => true,
            ],
            [
                'zone_name' => 'Outside Dhaka (1kg+)',
                // 'min_weight_kg' => 1.01,
                'max_weight_kg' => 0,
                'rate_per_kg' => 30.00,
                'base_rate' => 120.00,
                'delivery_time_days' => '3-5 days',
                'is_active' => true,
            ],
            [
                'zone_name' => 'Express Delivery (Any Zone, 0-1kg)',
                // 'min_weight_kg' => 0.00,
                'max_weight_kg' => 1.00,
                'rate_per_kg' => 0.00,
                'base_rate' => 150.00,
                'delivery_time_days' => '24 hours',
                'is_active' => true,
            ],
            [
                'zone_name' => 'Express Delivery (Any Zone, 1kg+)',
                // 'min_weight_kg' => 1.01,
                'max_weight_kg' => 0,
                'rate_per_kg' => 40.00,
                'base_rate' => 150.00,
                'delivery_time_days' => '24 hours',
                'is_active' => true,
            ],
            ];


            foreach($shipping_rates as $shipping_rate){
                ShippingRate::create($shipping_rate);
            }

            $this->command->info('Shipping Rate Seed Successfully');
    }
}
