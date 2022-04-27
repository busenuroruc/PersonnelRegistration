<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address_Type extends Model
{
    use HasFactory;
    protected $fillable = [
        'address_type',
    ];

    public function getAddress(){
        return $this->belongsTo(Address::class, 'address_type_id', 'id');
    }
}
