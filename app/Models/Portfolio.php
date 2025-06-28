<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'title',
        'category',
        'thumbnail',
        'description',
        'project_url',
        'slug',
    ];

    protected $appends = [
        'thumbnail_url',
    ];

    public function getThumbnailUrlAttribute()
    {
        return asset('storage/portfolios/' . $this->thumbnail);
    }
}
