<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Product::create([
            'name' => 'Smartphone',
            'slug' => 'smartphone',
            'description' => 'Latest model smartphone with advanced features.',
            'price' => 699.99,
            'discount_type' => 'percentage',
            'discount_value' => 10.00,
            'category_id' => 1, // Assuming category ID 1 exists
            'image' => 'images/products/smartphone.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Washing Machine',
            'slug' => 'washing-machine',
            'description' => 'High-efficiency washing machine with multiple settings.',
            'price' => 499.99,
            'discount_type' => 'fixed',
            'discount_value' => 50.00,
            'category_id' => 2, // Assuming category ID 2 exists
            'image' => 'images/products/washing_machine.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Fiction Book',
            'slug' => 'fiction-book',
            'description' => 'A captivating fiction book that keeps you on the edge of your seat.',
            'price' => 19.99,
            'discount_type' => null,
            'discount_value' => null,
            'category_id' => 3, // Assuming category ID 3 exists
            'image' => 'images/products/fiction_book.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Laptop',
            'slug' => 'laptop',
            'description' => 'High-performance laptop suitable for gaming and professional use.',
            'price' => 1299.99,
            'discount_type' => 'percentage',
            'discount_value' => 15.00,
            'category_id' => 1, // Assuming category ID 1 exists
            'image' => 'images/products/laptop.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Refrigerator',
            'slug' => 'refrigerator',
            'description' => 'Energy-efficient refrigerator with spacious storage.',
            'price' => 899.99,
            'discount_type' => null,
            'discount_value' => null,
            'category_id' => 2, // Assuming category ID 2 exists
            'image' => 'images/products/refrigerator.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Science Book',
            'slug' => 'science-book',
            'description' => 'An informative science book that explores the wonders of the universe.',
            'price' => 24.99,
            'discount_type' => null,
            'discount_value' => null,
            'category_id' => 3, // Assuming category ID 3 exists
            'image' => 'images/products/science_book.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Bluetooth Headphones',
            'slug' => 'bluetooth-headphones',
            'description' => 'Wireless Bluetooth headphones with noise cancellation.',
            'price' => 199.99,
            'discount_type' => 'fixed',
            'discount_value' => 20.00,
            'category_id' => 1, // Assuming category ID 1 exists
            'image' => 'images/products/bluetooth_headphones.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Microwave Oven',
            'slug' => 'microwave-oven',
            'description' => 'Compact microwave oven with multiple cooking modes.',
            'price' => 149.99,
            'discount_type' => null,
            'discount_value' => null,
            'category_id' => 2, // Assuming category ID 2 exists
            'image' => 'images/products/microwave_oven.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'History Book',
            'slug' => 'history-book',
            'description' => 'A detailed history book covering significant events and figures.',
            'price' => 29.99,
            'discount_type' => null,
            'discount_value' => null,
            'category_id' => 3, // Assuming category ID 3 exists
            'image' => 'images/products/history_book.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Gaming Console',
            'slug' => 'gaming-console',
            'description' => 'Next-gen gaming console with 4K support and exclusive games.',
            'price' => 499.99,
            'discount_type' => 'percentage',
            'discount_value' => 5.00,
            'category_id' => 1, // Assuming category ID 1 exists
            'image' => 'images/products/gaming_console.jpg',
            'is_active' => true,
        ]);
        Product::create([
            'name' => 'Air Conditioner',
            'slug' => 'air-conditioner',
            'description' => 'Energy-efficient air conditioner with smart features.',
            'price' => 799.99,
            'discount_type' => null,
            'discount_value' => null,
            'category_id' => 2, // Assuming category ID 2 exists
            'image' => 'images/products/air_conditioner.jpg',
            'is_active' => true,
        ]); 
    }
}
