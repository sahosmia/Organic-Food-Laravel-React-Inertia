<?php

namespace App\Http\Controllers\Admin\Product;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search', '');

        $data = Category::query()
            ->when($search, function ($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return Inertia::render('admin/product-module/category/index', [
            'categories' => $data,
        ]);
    }

    // Create
    public function create()
    {
        return Inertia::render('admin/product-module/category/create');
    }

    // Store
    public function store(StoreCategoryRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
            $validatedData['image'] = basename($imagePath);
        } else {
            $validatedData['image'] = null;
        }

        Category::create($validatedData);

        return redirect()->route('admin.product_m.categories.index')->with('success', 'Category created successfully.');
    }


    // Show
    public function show(Category $category)
    {
        return Inertia::render('admin/product-module/category/show', [
            'category' => $category,
        ]);
    }

    // Edit
    public function edit(Category $category)
    {
        return Inertia::render('admin/product-module/category/edit', [
            'category' => $category,
        ]);
    }
    // $validatedData = $request->validate(
    //     [
    //         'title' => '',
    //         'description' => ['nullable', ],
    //         'image' => ['nullable'],
    //     ]
    // );

    // dd($category);

    // Update
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validatedData = $request->validated();

        // ===
        $oldImageName = $category->image;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
            if ($imagePath) {
                $validatedData['image'] = basename($imagePath);

                if ($oldImageName && Storage::disk('public')->exists('categories/' . $oldImageName)) {
                    Storage::disk('public')->delete('categories/' . $oldImageName);
                }
            }
        }

        $category->update($validatedData);

        return redirect()->route('admin.product_m.categories.index')->with('success', 'Category updated successfully.');
    }


    public function destroy(Category $category)
    {
        if ($category->image && Storage::disk('public')->exists('categories/' . $category->image)) {
            Storage::disk('public')->delete('categories/' . $category->image);
        }

        $category->delete();
        return redirect()->route('admin.product_m.categories.index')->with('success', 'Category deleted successfully.');
    }
}
