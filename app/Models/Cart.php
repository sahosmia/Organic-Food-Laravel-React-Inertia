<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
    ];

    /**
     * Get the product associated with the cart item.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    /**
     * Get the user associated with the cart item.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'quantity' => 'integer',
    ];
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'carts';
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be appended to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'total_price',
    ];
    /**
     * Get the total price of the cart item.
     *
     * @return float
     */
    public function getTotalPriceAttribute()
    {
        return $this->product->price * $this->quantity;
    }
    /**
     * Scope a query to only include items for a specific user.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
    /**
     * Scope a query to only include items for a specific product.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $productId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForProduct($query, $productId)
    {
        return $query->where('product_id', $productId);
    }
    /**
     * Scope a query to only include items with a specific quantity.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $quantity
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithQuantity($query, $quantity)
    {
        return $query->where('quantity', $quantity);
    }
}
