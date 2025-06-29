<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Inertia\Inertia;

class PortfolioFrontController extends controller
{

    public function index()
    {
        $portfolios = Portfolio::latest()->paginate(10);

        return Inertia::render('frontend/Portfolio', [
            'portfolios' => $portfolios,
        ]);
    }
    public function show($id)
    {
           $portfolio = Portfolio::findOrFail($id);

        // return $id;



        return Inertia::render('frontend/PortfolioSingle', [
            'portfolio' => $portfolio,
        ]);
    }
}
