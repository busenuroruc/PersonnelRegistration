<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;
    protected $fillable = [
        'phone',
        'address_id',
    ];

    public function getAddress(){
        return $this->hasOne(Address::class, 'id', 'address_id');
    }
}
