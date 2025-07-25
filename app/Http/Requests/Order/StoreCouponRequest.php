<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCouponRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust authorization as needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:50', 'unique:coupons,code'],
            'type' => ['required', Rule::in(['percentage', 'fixed_amount', 'free_shipping'])],
            'value' => array_merge([
                'nullable',
                'numeric',
                'min:0',
                Rule::requiredIf(fn() => in_array(request('type'), ['percentage', 'fixed_amount'])),
            ], request('type') === 'percentage' ? ['max:100'] : []),
            'min_amount' => ['nullable', 'numeric', 'min:0'],
            'max_uses' => ['nullable', 'integer', 'min:1'],
            'starts_at' => ['nullable', 'date', 'after_or_equal:today'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_active' => ['boolean'],
        ];
    }

    /**
     * Custom messages for validation errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'value.required_if' => 'The value field is required when the coupon type is percentage or fixed amount.',
            'expires_at.after_or_equal' => 'The expiry date must be after or equal to the start date.',
        ];
    }

    public function prepareForValidation()
    {
        if($this->has('type') && $this->input('type') === 'free_shipping'){
            $this->merge(['value'=>0]);
        }

    }
}
