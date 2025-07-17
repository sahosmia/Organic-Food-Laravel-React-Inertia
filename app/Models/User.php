<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;


    protected $fillable = [
        'name',
        'email',
        'password',
    ];


    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'userFormattedCart',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function cart()
    {
        return $this->hasMany(Cart::class, 'user_id');
    }

    public function getUserFormattedCartAttribute()
    {
        return "test";
    }

    public function getFormattedCartItemsAttribute(): array
    {


        $cartItemsCollection = $this->cart()->with('product')->get();

        $formattedCart = [];
        foreach ($cartItemsCollection as $cartItem) {

            if ($cartItem->product) {
                $formattedCart[$cartItem->product_id] = [
                    'id' => $cartItem->product_id,
                    'name' => $cartItem->product->name,
                    'price' => (float) $cartItem->product->price,
                    'quantity' => (int) $cartItem->quantity,
                    'image_url' => $cartItem->product->image_url,

                ];
            }
        }

        return $formattedCart;
    }
    /**
     * Get the orders for the user.
     */
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }
    /**
     * Get the products that the user has purchased.
     */
    public function purchasedProducts()
    {
        return $this->belongsToMany(Product::class, 'orders', 'user_id', 'product_id')
            ->withPivot('quantity', 'created_at')
            ->withTimestamps();
    }
    /**
     * Get the products that the user has added to their wishlist.
     */
    public function wishlist()
    {
        return $this->belongsToMany(Product::class, 'wishlists', 'user_id', 'product_id')
            ->withTimestamps();
    }
    /**
     * Get the products that the user has reviewed.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id');
    }
    /**
     * Get the user's address.
     */
    public function address()
    {
        return $this->hasOne(Address::class, 'user_id');
    }
    /**
     * Get the user's payment methods.
     */
    // public function paymentMethods()
    // {
    //     return $this->hasMany(PaymentMethod::class, 'user_id');
    // }
    /**
     * Get the user's roles.
     */
    // public function roles()
    // {
    //     return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id')
    //         ->withTimestamps();
    // }
    /**
     * Check if the user has a specific role.
     *
     * @param string $role
     * @return bool
     */
    public function hasRole(string $role): bool
    {
        return $this->roles()->where('name', $role)->exists();
    }
}
