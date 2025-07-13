<?php
namespace App\Traits;




trait SlugAsRouteKey
{
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
