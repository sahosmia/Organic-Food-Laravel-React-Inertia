<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portfolios = [
             [
            'title' => 'Personal Portfolio Website',
            'slug' =>'Personal Portfolio Website',
            'category' => 'Web Design',
            'thumbnail' => 'one.png',
            'description' => 'A modern personal portfolio built with React and Tailwind CSS.',
            'project_url' => 'https://yourportfolio.com',
        ],
        [
            'title' => 'E-Commerce Platform',
            'slug' => 'E-Commerce Platform',
            'category' => 'Web Development',
            'thumbnail' => 'two.png',
            'description' => 'A full-featured online store built using Laravel and Vue.js.',
            'project_url' => 'https://ecommerce-demo.com',
        ],
        [
            'title' => 'Mobile Banking App UI',
            'slug' => 'Mobile Banking App UI',
            'category' => 'UI/UX Design',
            'thumbnail' => 'three.png',
            'description' => 'A clean and user-friendly mobile banking app interface design in Figma.',
            'project_url' => '',
        ],
        [
            'title' => 'Clinic Management System',
            'slug' => 'Clinic Management System',
            'category' => 'Full Stack Development',
            'thumbnail' => 'four.png',
            'description' => 'A system to manage appointments, patients, and doctors for clinics.',
            'project_url' => 'https://clinic-system.com',
        ],
        [
            'title' => 'BookSwap App',
            'slug' => 'BookSwap App',
            'category' => 'Student Project',
            'thumbnail' => 'five.png',
            'description' => 'A book exchanging platform built with Next.js and Tailwind CSS.',
            'project_url' => 'https://bookswap.me',
        ],
    ];
        foreach ($portfolios as $portfolio) {
            Portfolio::create($portfolio);
        }
    }
}
