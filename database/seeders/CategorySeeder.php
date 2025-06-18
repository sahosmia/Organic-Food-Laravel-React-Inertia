<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Category::create([
            'title' => 'Organic Food',
            'slug' => 'organic-food',
            'description' => 'All kinds of electronic items including phones, laptops, and accessories.',
            'image' => 'one.jpg',
        ]);

        \App\Models\Category::create([
            'title' => 'Organic Juice',
            'slug' => 'organic-juice',
            'description' => 'Appliances for home use including refrigerators, washing machines, and more.',
            'image' => 'two.jpg',

        ]);

        \App\Models\Category::create([
            'title' => 'Nut Cookies',
            'slug' => 'nut-cookies',
            'description' => 'A wide range of books across various genres.',
            'image' => 'three.jpg',

        ]);


    }
}
