<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{

    protected $fillable = [
        'title',
        'author',
        'thumbnail',
        'description',
        'long_description',
        'slug',
    ];

    protected $appends = [
        'thumbnail_url',
    ];

    public function getThumbnailUrlAttribute()
    {
        return asset('storage/blogs/' . $this->thumbnail);
    }
}
