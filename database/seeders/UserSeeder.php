<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'User 1',
            'email' => 'user1@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'User 2',
            'email' => 'user2@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'User 3',
            'email' => 'user3@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'User 4',
            'email' => 'user4@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
        User::create([
            'name' => 'User 5',
            'email' => 'user5@gmail.com',
            'password' => bcrypt('12345678'),
        ]);
    }
}
