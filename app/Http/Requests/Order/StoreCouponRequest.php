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
            'coupon_code' => ['required', 'string', 'max:50', 'unique:coupons,coupon_code'],
            'discount_type' => ['required', Rule::in(['percentage', 'fixed_amount'])],
            'discount_value' => array_merge([
                'nullable',
                'numeric',
                'min:0',
                Rule::requiredIf(fn() => in_array(request('discount_type'), ['percentage', 'fixed_amount'])),
            ], request('discount_type') === 'percentage' ? ['max:100'] : []),
            'min_order_amount' => ['nullable', 'numeric', 'min:0'],
            'usage_limit' => ['nullable', 'integer', 'min:1'],
            'start_date' => ['nullable', 'date', 'after_or_equal:today'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
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
            'discount_value.required_if' => 'The value field is required when the coupon type is percentage or fixed amount.',
            'end_date.after_or_equal' => 'The expiry date must be after or equal to the start date.',
        ];
    }

    public function prepareForValidation()
    {
        if($this->has('discount_type') && $this->input('discount_type') === 'free_shipping'){
            $this->merge(['discount_value'=>0]);
        }

    }
}
