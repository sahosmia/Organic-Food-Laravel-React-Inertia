<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                // Get some existing user and product IDs
                $userIds = User::pluck('id')->toArray();
                $productIds = Product::pluck('id')->toArray();

                // Check if we actually have users and products to work with
                if (empty($userIds) || empty($productIds)) {
                    $this->command->error('No users or products found. Please seed them first.');
                    return;
                }

                // --- Direct creation of Review records ---

                // Review 1: Approved, Good rating
                Review::create([
                    'product_id' => $productIds[array_rand($productIds)],
                    'user_id' => $userIds[array_rand($userIds)],      
                    'rating' => 5,
                    'comment' => 'This product is absolutely amazing! Highly recommended.',
                    'approved' => true,
                    'approved_at' => now(),
                    'created_at' => now()->subDays(10),
                    'updated_at' => now()->subDays(5),
                ]);

                // Review 2: Approved, Average rating
                Review::create([
                    'product_id' => $productIds[array_rand($productIds)],
                    'user_id' => $userIds[array_rand($userIds)],
                    'rating' => 3,
                    'comment' => 'It\'s okay, does the job but nothing special.',
                    'approved' => true,
                    'approved_at' => now()->subDays(2),
                    'created_at' => now()->subDays(8),
                    'updated_at' => now()->subDays(2),
                ]);

                // Review 3: Pending, Low rating (example for moderation)
                Review::create([
                    'product_id' => $productIds[array_rand($productIds)],
                    'user_id' => $userIds[array_rand($userIds)],
                    'rating' => 2,
                    'comment' => 'Not entirely happy with this purchase. Expected more.',
                    'approved' => false,
                    'approved_at' => null, // Not approved yet
                    'created_at' => now()->subDays(3),
                    'updated_at' => now()->subDays(3),
                ]);

                // You can add more direct review entries here
                Review::create([
                    'product_id' => $productIds[array_rand($productIds)],
                    'user_id' => $userIds[array_rand($userIds)],
                    'rating' => 4,
                    'comment' => 'Good quality for the price. Fast shipping.',
                    'approved' => true,
                    'approved_at' => now(),
                    'created_at' => now()->subDays(1),
                    'updated_at' => now(),
                ]);

                $this->command->info('Dummy reviews created successfully without using factories!');

    }
}
