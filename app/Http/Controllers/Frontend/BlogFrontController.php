<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Inertia\Inertia;

class BlogFrontController extends Controller
{
    public function index()
    {
        $blogs = Blog::latest()->paginate(10);

        return Inertia::render('frontend/Blog', [
            'blogs' => $blogs,
        ]);
    }
    public function show($id)
    {
        $blog = Blog::findOrFail($id);

        return Inertia::render('frontend/BlogShow', [
            'blog' => $blog,
        ]);
    }
}
