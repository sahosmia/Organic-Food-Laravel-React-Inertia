<?php
namespace App\Traits;


trait IsActive
{
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
