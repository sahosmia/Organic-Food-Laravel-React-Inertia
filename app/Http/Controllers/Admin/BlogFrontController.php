<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class BlogFrontController extends controller {

    public function index(){
        return Inertia::render('front/team');
    }
}
