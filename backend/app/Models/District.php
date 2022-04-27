<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    use HasFactory;
    protected $fillable = [
        'district_name',
        'city_id',
    ];

    public function getDistrictAddress(){
        return $this->belongsTo(Address::class, 'district_id', 'id');
    }
}
