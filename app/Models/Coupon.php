<?php

namespace App\Models;

use App\Traits\IsActive;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use IsActive;

     protected $fillable = [
        'coupon_code',
        'discount_type',
        'discount_value',
        'min_order_amount',
        'usage_limit',
        'used_count',
        'start_date',
        'end_date',
        'description',
        'is_active',
    ];

    protected $casts = [
        'usage_limit' => 'integer',
        'used_count' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
    ];


      public function isActive(): bool
    {
        // Check general active status
        if (!$this->is_active) {
            return false;
        }

        // Check start date
        if ($this->start_date && $this->start_date->isFuture()) {
            return false;
        }

        // Check expiry date
        if ($this->end_date && $this->end_date->isPast()) {
            return false;
        }

        // Check usage limit
        if ($this->usage_limit !== null && $this->used_count >= $this->usage_limit) {
            return false;
        }

        return true;
    }


    public function isApplicable(float $amount = 0): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        if ($this->min_order_amount > 0 && $amount < $this->min_order_amount) {
            return false;
        }

        return true;
    }
}
