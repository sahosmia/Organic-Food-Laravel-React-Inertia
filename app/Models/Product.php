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
        'slug',
        'discount_type',
        'discount_value',
        'category_id',
        'image',
        'additional_information',
        'another_product_description',
    ];

    protected $appends = [
        'formatted_price',
        'formatted_description',
        'image_url',
        'thumbnail_url',
        'discounted_price',
        // 'average_rating',
        // 'stock_status',
        // 'seo_title',
        // 'seo_description',
        // 'seo_keywords',
        // 'url',
        // 'availability_status',
        // 'additional_information'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2',
        'discount_value' => 'decimal:2',
        'additional_information' => 'array', // Assuming additional_information is stored as JSON
        'another_product_description' => 'string', // Assuming this is a text field
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
    // public function tags()
    // {
    //     // return $this->belongsToMany(Tag::class);
    // }
   
    
    // Get the product's reviews.
    // public function reviews()
    // {
    //     return $this->hasMany(Review::class);
    // }
    
    // Get the product's average rating.
    // public function getAverageRatingAttribute()
    // {
    //     return $this->reviews()->avg('rating'); 
    // }
   
    // Get the product's stock status.
    // public function getStockStatusAttribute()
    // {
    //     return $this->stock > 0 ? 'In Stock' : 'Out of Stock'; 
    // }
    
    // Get the product's SEO title.
    // public function getSeoTitleAttribute()
    // {
    //     return $this->name . ' - ' . config('app.name'); 
    // }



    // Get the product's discounted price.
    public function getDiscountedPriceAttribute()
    {
        $price = $this->attributes['price'] ?? 0; 
        $discountType = $this->attributes['discount_type'] ?? null;
        $discountValue = $this->attributes['discount_value'] ?? 0;

       if ($discountType === 'percentage') {
            return $price - ($price * ($discountValue / 100));
        } elseif ($discountType === 'fixed') {
            return $price - $discountValue;
        }

        return $price; 
    }

  // Get the product's SEO description.
    public function getSeoDescriptionAttribute()
    {
        return substr(strip_tags($this->description), 0, 160); 
    }
    
    // Get the product's SEO keywords.
    // public function getSeoKeywordsAttribute()
    // {
    //     return implode(',', $this->tags->pluck('name')->toArray()); 
    // }

   
    // Get the product's URL.
    // public function getUrlAttribute()
    // {
    //     return route('products.show', $this->slug); 
    // }
   
    // Get the product's availability status.
    // public function getAvailabilityStatusAttribute()
    // {
    //     return $this->stock > 0 ? 'Available' : 'Unavailable'; 
    // }
  


}
