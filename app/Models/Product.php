<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'is_active',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
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

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
    /**
     * Scope a query to order products by creation date.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrderedByCreationDate($query)
    {
        return $query->orderBy('created_at', 'desc');
    }
    /**
     * Get the formatted price.
     *
     * @return string
     */
    public function getFormattedPriceAttribute()
    {
        return number_format($this->price, 2, '.', ',');
    }
    /**
     * Get the product's description with HTML formatting.
     *
     * @return string
     */
    public function getFormattedDescriptionAttribute()
    {
        return nl2br(e($this->description)); // Convert new lines to <br> tags and escape HTML
    }
    /**
     * Get the product's image URL.
     *
     * @return string
     */
    public function getImageUrlAttribute()
    {
        return asset('storage/products/' . $this->image); // Assuming you store images in the 'storage/products' directory
    }
    /**
     * Get the product's thumbnail URL.
     *
     * @return string
     */
    public function getThumbnailUrlAttribute()
    {
        return asset('storage/products/thumbnails/' . $this->thumbnail); // Assuming you store thumbnails in the 'storage/products/thumbnails' directory
    }
    /**
     * Get the product's category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    /**
     * Get the product's tags.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
    /**
     * Get the product's reviews.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    /**
     * Get the product's ratings.
     *
     * @return float
     */
    public function getAverageRatingAttribute()
    {
        return $this->reviews()->avg('rating'); // Assuming 'rating' is a field in the reviews table
    }
    /**
     * Get the product's stock status.
     *
     * @return string
     */
    public function getStockStatusAttribute()
    {
        return $this->stock > 0 ? 'In Stock' : 'Out of Stock'; // Assuming 'stock' is a field in the products table
    }
    /**
     * Get the product's SEO title.
     *
     * @return string
     */
    public function getSeoTitleAttribute()
    {
        return $this->name . ' - ' . config('app.name'); // Assuming you want to append the app name to the product name
    }


    protected $appends = ['discounted_price']; // Add your accessor name here

    // discounted price by percentage and fixed amount, you will get discount_type, discount_value, and price from the product model
    public function getDiscountedPriceAttribute()
    {
        $price = $this->attributes['price'] ?? 0; // Access original attribute to avoid recursion
        $discountType = $this->attributes['discount_type'] ?? null;
        $discountValue = $this->attributes['discount_value'] ?? 0;

       if ($discountType === 'percentage') {
            return $price - ($price * ($discountValue / 100));
        } elseif ($discountType === 'fixed') {
            return $price - $discountValue;
        }

        return $price; // No discount applied, return original price
    }
    /**
     * Get the product's SEO description.
     *
     * @return string
     */
    public function getSeoDescriptionAttribute()
    {
        return substr(strip_tags($this->description), 0, 160); // Truncate the description to 160 characters for SEO
    }
    /**
     * Get the product's SEO keywords.
     *
     * @return string
     */
    public function getSeoKeywordsAttribute()
    {
        return implode(',', $this->tags->pluck('name')->toArray()); // Assuming you have a 'tags' relationship and want to use tag names as keywords
    }
    /**
     * Get the product's URL.
     *
     * @return string
     */
    public function getUrlAttribute()
    {
        return route('products.show', $this->slug); // Assuming you have a route named 'products.show' that takes a slug
    }
    /**
     * Get the product's availability status.
     *
     * @return string
     */
    public function getAvailabilityStatusAttribute()
    {
        return $this->stock > 0 ? 'Available' : 'Unavailable'; // Assuming 'stock' is a field in the products table
    }

}
