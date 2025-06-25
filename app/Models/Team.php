<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $filable = [
        'name',
        'image',
        'designation',
        'facebook_url',
        'instagram_url',
    ];

    protected $appends = [
        'image_url',
    ];

    public function getImageUrlAttribute(){
        return asset('storage/teams/'. $this->image);
    }
}
