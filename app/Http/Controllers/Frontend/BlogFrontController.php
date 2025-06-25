<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class BlogFrontController extends controller {

    public function index(){
        return Inertia::render('front/team');
    }
}
