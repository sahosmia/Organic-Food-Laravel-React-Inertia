<?php
namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Inertia\Inertia;

class TeamController extends controller {

    public function index(){
        $teams = Team::latest()->paginate(10);
        return Inertia::render('frontend/Team', [
            'teams' => $teams,
        ]);
    }
}
