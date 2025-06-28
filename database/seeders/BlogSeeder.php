<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'Blog Title 1',
                'author' => 'Author 1',
                'thumbnail' => 'one.png',
                'description' => 'Short description of blog 1.',
                'long-description' => 'Detailed content of blog 1.',
                'slug' => 'blog-title-1',
            ],

            [
                'title' => 'Blog Title 2',
                'author' => 'Author 2',
                'thumbnail' => 'two.png',
                'description' => 'Short description of blog 2.',
                'long-description' => 'Detailed content of blog 2.',
                'slug' => 'blog-title-2',
            ],

            [
                'title' => 'Blog Title 3',
                'author' => 'Author 3',
                'thumbnail' => 'three.png',
                'description' => 'Short description of blog 3.',
                'long-description' => 'Detailed content of blog 3.',
                'slug' => 'blog-title-3',
            ],
            [
                'title' => 'Blog Title 4',
                'author' => 'Author 4',
                'thumbnail' => 'four.png',
                'description' => 'Short description of blog 4.',
                'long-description' => 'Detailed content of blog 4.',
                'slug' => 'blog-title-4',
            ],
            [
                'title' => 'Blog Title 5',
                'author' => 'Author 5',
                'thumbnail' => 'five.png',
                'description' => 'Short description of blog 5.',
                'long-description' => 'Detailed content of blog 5.',
                'slug' => 'blog-title-5',
            ],
            [
                'title' => 'Blog Title 6',
                'author' => 'Author 6',
                'thumbnail' => 'six.png',
                'description' => 'Short description of blog 6.',
                'long-description' => 'Detailed content of blog 6.',
                'slug' => 'blog-title-6',
            ],
        ];
        foreach ($blogs as $blog) {
            Blog::create($blog);
        }

    }
}
