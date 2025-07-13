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
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 1',
            'email' => 'user1@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 2',
            'email' => 'user2@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => false,
        ]);
        User::create([
            'name' => 'User 3',
            'email' => 'user3@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 4',
            'email' => 'user4@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => false,
        ]);
        User::create([
            'name' => 'User 5',
            'email' => 'user5@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 6',
            'email' => 'user6@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 7',
            'email' => 'user7@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => false,
        ]);
        User::create([
            'name' => 'User 8',
            'email' => 'user8@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 9',
            'email' => 'user9@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => false,
        ]);
        User::create([
            'name' => 'User 10',
            'email' => 'user10@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 11',
            'email' => 'user11@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => false,
        ]);
        User::create([
            'name' => 'User 12',
            'email' => 'user12@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => true,
        ]);
        User::create([
            'name' => 'User 13',
            'email' => 'user13@gmail.com',
            'password' => bcrypt('12345678'),
            'is_active' => false,
        ]);
    }
}
