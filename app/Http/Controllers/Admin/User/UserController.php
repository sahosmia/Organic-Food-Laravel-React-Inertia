<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends controller
{

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');

        $users = User::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return Inertia::render('admin/user-module/user/index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/user-module/user/create');
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $data['password'] = bcrypt($data['password']);
        User::create($data);

        return redirect()->route('admin.user_m.users.index')->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        return Inertia::render('admin/user-module/user/show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/user-module/user/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($request->filled('password')) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()->route('admin.user_m.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(Request $request, ?User $user = null)
    {
        if ($user) {
            $user->delete();
            return redirect()->route('admin.user_m.users.index')->with('success', 'User deleted successfully.');
        }

        $ids = $request->input('ids');

        if ($ids) {
            $userIds = explode(',', $ids);

            $userIds = array_filter($userIds, 'is_numeric');

            if (empty($userIds)) {
                return redirect()->back()->with('error', 'No valid users selected for deletion.');
            }


            DB::transaction(function () use ($userIds) {
                User::whereIn('id', $userIds)->delete();
            });

            return redirect()->route('admin.user_m.users.index')->with('success', count($userIds) . ' users deleted successfully.');
        }

        return redirect()->route('admin.user_m.users.index')->with('success', 'Users deleted successfully.');
    }


    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids'); // Query parameter থেকে 'ids' নিন
        return $ids;

        if (empty($ids)) {
            return redirect()->back()->with('error', 'No users selected for bulk deletion.');
        }

        $userIds = explode(',', $ids);
        $userIds = array_filter($userIds, 'is_numeric'); // নিশ্চিত করা যে আইডিগুলো শুধুমাত্র সংখ্যা

        if (empty($userIds)) {
            return redirect()->back()->with('error', 'No valid users selected for deletion.');
        }

        DB::transaction(function () use ($userIds) {
            User::whereIn('id', $userIds)->delete();
        });

        return redirect()->back()->with('success', count($userIds) . ' users deleted successfully.');
    }

    public function toggleStatus(User $user)
    {
        $user->is_active = !$user->is_active;
        $user->save();

        return redirect()->back()->with('success', 'User status updated successfully.');
    }
}
