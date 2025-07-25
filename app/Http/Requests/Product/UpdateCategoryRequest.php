<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
         return [
        'title' => [
            'required',
            'string',
            'max:255',
            Rule::unique('categories', 'title')->ignore($this->category->id),
        ],
        'description' => ['nullable', 'string', 'max:1000'],
        'image' => ['nullable', 'image', 'mimes:png,jpg,jpeg', 'max:2048'],
    ];
    }
}
