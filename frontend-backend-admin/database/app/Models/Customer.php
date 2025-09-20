<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
    protected $primaryKey = 'customer_id';
    public $timestamps = false;

    protected $fillable = [
        'full_name', 'email', 'password', 'address',
        'phone_number', 'registration_date'
    ];
}
