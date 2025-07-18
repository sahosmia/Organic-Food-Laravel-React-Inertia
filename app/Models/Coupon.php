<?php

namespace App\Models;

use App\Traits\IsActive;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use IsActive;
}
