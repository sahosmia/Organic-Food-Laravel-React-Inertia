<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = [
            [
                'image' => "two.jpg", // Changed 'src' to 'image'
                'name' => "Alice Wonderland",
                'designation' => "Lead Agronomist",
                'facebook_url' => "https://facebook.com/alicew",
                'instagram_url' => "https://instagram.com/alicew",
            ],
            [
                'image' => "three.jpg", // Changed 'src' to 'image'
                'name' => "Bob The Builder",
                'designation' => "Chief Investigator",
                'facebook_url' => null,
                'instagram_url' => "https://instagram.com/bobtb",
            ],
            [
                'image' => "five.jpg", // Changed 'src' to 'image'
                'name' => "Charlie Chaplin",
                'designation' => "Product Designer",
                'facebook_url' => "https://facebook.com/charliec",
                'instagram_url' => null,
            ],
            [
                'image' => "six.jpg", // Changed 'src' to 'image'
                'name' => "Diana Prince",
                'designation' => "UX/UI Specialist",
                'facebook_url' => "https://facebook.com/dianap",
                'instagram_url' => "https://instagram.com/dianap",
            ],
            [
                'image' => "one.jpg", // Changed 'src' to 'image'
                'name' => "Eve Harrington",
                'designation' => "Senior Developer",
                'facebook_url' => null,
                'instagram_url' => null,
            ],
            [
                'image' => "four.jpg", // Changed 'src' to 'image'
                'name' => "Frank Ocean",
                'designation' => "Digital Marketing Manager",
                'facebook_url' => "https://facebook.com/franko",
                'instagram_url' => "https://instagram.com/franko",
            ],
        ];
        //


        foreach ($teams as $member) {
            Team::create([
               'name' => $member['name'],
                'image' => $member['image'], // Directly using the 'image' key
                'designation' => $member['designation'],
                'facebook_url' => $member['facebook_url'],
                'instagram_url' => $member['instagram_url'],
            ]);
        }
    }
}
