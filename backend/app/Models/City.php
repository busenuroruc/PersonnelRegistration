<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $fillable = [
        'city_name',
    ];

    public function getCityAddress(){
        return $this->belongsTo(Address::class, 'city_id', 'id');
    }
}
