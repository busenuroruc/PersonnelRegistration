<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    use HasFactory;
    protected $fillable = [
        'personnel_name',
        'personnel_surname',
        'personnel_birthday',
        'personnel_birthplace',
        'address_id',
    ];

    public function getAddress(){
        return $this->hasMany(Address::class, 'id', 'id');
    }
}
