<?php

namespace App\Models;

use App\Traits\HasSlug;
use App\Traits\IsActive;
use App\Traits\SlugAsRouteKey;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    use SlugAsRouteKey, IsActive, HasSlug;

    // Properties List Here ============================================

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
    ];


    protected $appends = [
        'image_url',
    ];


    // Relationships List Here ===========================================
    public function products()
    {
        return $this->hasMany(Product::class); 
    }




    // Accessor List Here =================================================

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/categories/' . $this->image);
        }
        return asset('images/default_category.jpg');
    }


    // Scopes List Here ===================================================

    public function activeProducts()
    {
        return $this->hasMany(Product::class)->where('is_active', true);
    }



}
