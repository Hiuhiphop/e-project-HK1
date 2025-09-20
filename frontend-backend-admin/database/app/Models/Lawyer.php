<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lawyer extends Model {
    protected $primaryKey = 'lawyer_id';
    public $timestamps = false;

    protected $fillable = [
        'full_name', 'email', 'password', 'phone_number',
        'specialization_id', 'experience_years', 'address',
        'city', 'province', 'registration_date'
    ];

    public function specialization() {
        return $this->belongsTo(Specialization::class, 'specialization_id');
    }
}
