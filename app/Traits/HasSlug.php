<?php

namespace App\Traits;

use Illuminate\Support\Str;


trait HasSlug
{
    protected static function bootHasSlug()
    {
        static::creating(
            function ($model) {
                if (empty($model->slug)) {
                    $slug = Str::slug($model->title ?? $model->name);
                } else {
                    $slug = Str::slug($model->slug);
                }

                $orginalSlug = $slug;
                $count = 1;
                while (static::where('slug', $slug)->exists()) {
                    $slug = $orginalSlug . "-" . $count;
                    $count++;
                }

                $model->slug = $slug;
            }
        );
    }


    public function setSlugAttribute($value)
    {
        $this->attributes['slug'] = $value;
    }
}
