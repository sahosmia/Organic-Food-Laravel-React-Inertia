<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
    ];
    protected $appends = [
        'formatted_title',
        'formatted_description',
        'formatted_slug',
        'image_url',
        'thumbnail_url',
    ];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug'; // Assuming you have a 'slug' field for SEO-friendly URLs
    }
    /**
     * Get the products associated with the category.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
    /**
     * Scope a query to order categories by creation date.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrderedByCreationDate($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
    /**
     * Get the formatted title for the category.
     *
     * @return string
     */
    public function getFormattedTitleAttribute()
    {
        return ucfirst($this->title);
    }
    /**
     * Get the formatted description for the category.
     *
     * @return string
     */
    public function getFormattedDescriptionAttribute()
    {
        return ucfirst($this->description);
    }
    /**
     * Get the formatted slug for the category.
     *
     * @return string
     */
    public function getFormattedSlugAttribute()
    {
        return strtolower(str_replace(' ', '-', $this->slug));
    }
    /**
     * Get the image URL for the category.
     *
     * @return string
     */
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/categories/' . $this->image);
        }
        // আপনার ডিফল্ট ছবির পাথ অনুযায়ী এটি পরিবর্তন করুন
        return asset('images/default_category.jpg');
    }
    /**
     * Get the thumbnail URL for the category.
     *
     * @return string
     */
    public function getThumbnailUrlAttribute()
    {
        return asset('storage/categories/thumbnails/' . $this->image); // Assuming you store thumbnails in the 'storage/categories/thumbnails' directory
    }
    /**
     * Get the category's products with active status.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function activeProducts()
    {
        return $this->hasMany(Product::class)->where('is_active', true);
    }
    /**
     * Get the category's products ordered by creation date.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orderedProducts()
    {
        return $this->hasMany(Product::class)->orderBy('created_at', 'desc');
    }
    /**
     * Get the category's products with active status and ordered by creation date.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function activeOrderedProducts()
    {
        return $this->hasMany(Product::class)->where('is_active', true)->orderBy('created_at', 'desc');
    }
    /**
     * Get the category's products with a specific tag.
     *
     * @param string $tag
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function productsWithTag($tag)
    {
        return $this->hasMany(Product::class)->whereHas('tags', function ($query) use ($tag) {
            $query->where('name', $tag);
        });
    }
}
