<?php

namespace App\Models;

use App\Traits\IsActive;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use IsActive;

     protected $fillable = [
        'code',
        'type', // 'percentage', 'fixed_amount', 'free_shipping'
        'value',
        'min_amount',
        'max_uses',
        'uses',
        'starts_at',
        'expires_at',
        'description',
        'is_active',
    ];

    protected $casts = [
        // 'value' => 'decimal:2',
        // 'min_amount' => 'decimal:2',
        'max_uses' => 'integer',
        'uses' => 'integer',
        'starts_at' => 'date',
        'expires_at' => 'date',
        'is_active' => 'boolean',
    ];


      public function isActive(): bool
    {
        // Check general active status
        if (!$this->is_active) {
            return false;
        }

        // Check start date
        if ($this->starts_at && $this->starts_at->isFuture()) {
            return false;
        }

        // Check expiry date
        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        // Check usage limit
        if ($this->max_uses !== null && $this->uses >= $this->max_uses) {
            return false;
        }

        return true;
    }


    public function isApplicable(float $amount = 0): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        if ($this->min_amount > 0 && $amount < $this->min_amount) {
            return false;
        }

        return true;
    }
}
