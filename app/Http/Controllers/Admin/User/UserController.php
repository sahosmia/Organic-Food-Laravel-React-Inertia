<?php
namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends controller {

    public function index(Request $request){
        $perPage = $request->input('per_page', 2);
        $search = $request->input('search', '');
        $users = User::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                             ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        return Inertia::render('admin/user-module/user/index',[
            'users' => $users,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function show(User $user){
        return Inertia::render('admin/user-module/user/show',[
            'user' => $user,
        ]);
    }
}
