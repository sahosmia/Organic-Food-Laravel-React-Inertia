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

     protected $casts = [
        'quantity' => 'string',
    ];



    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    protected $hidden = [
        'created_at',
        'updated_at',
    ];



    public function getTotalPriceAttribute()
    {
        return $this->product->price * $this->quantity;
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeForProduct($query, $productId)
    {
        return $query->where('product_id', $productId);
    }

    public function scopeWithQuantity($query, $quantity)
    {
        return $query->where('quantity', $quantity);
    }
}
