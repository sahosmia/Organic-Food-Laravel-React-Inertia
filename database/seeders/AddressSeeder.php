<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::all();
        $addresses = [
            [
                'label' => 'Home Address',
                'address_line_1' => 'House 10, Road 5',
                'address_line_2' => 'Block C, Bashundhara R/A',
                'city' => 'Dhaka',
                'district' => 'Dhaka',
                'post_code' => '1229',
                'is_default' => true,
                'user_id' => $user->random()->id,
            ],
            [
                'label' => 'Office Address',
                'address_line_1' => 'Building 20, Level 6',
                'address_line_2' => 'Software Park, Gulshan 1',
                'city' => 'Dhaka',
                'district' => 'Dhaka',
                'post_code' => '1212',
                'is_default' => false,
                'user_id' => $user->random()->id,
            ],
            [
                'label' => 'Home Address',
                'address_line_1' => 'House 10, Road 5',
                'address_line_2' => 'Block C, Bashundhara R/A',
                'city' => 'Dhaka',
                'district' => 'Dhaka',
                'post_code' => '1229',
                'is_default' => true,
                'user_id' => $user->random()->id,
            ],
            [
                'label' => 'Home Address',
                'address_line_1' => 'House 10, Road 5',
                'address_line_2' => 'Block C, Bashundhara R/A',
                'city' => 'Dhaka',
                'district' => 'Dhaka',
                'post_code' => '1229',
                'is_default' => true,
                'user_id' => $user->random()->id,
            ],
        ];

        foreach ($addresses as $address) {
            Address::create($address);
        }

        $this->command->info('Addresses seeded successfully!');
    }
}
