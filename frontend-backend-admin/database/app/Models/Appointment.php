<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model {
    protected $primaryKey = 'appointment_id';
    public $timestamps = false;

    protected $fillable = [
        'customer_id', 'lawyer_id', 'appointment_date',
        'appointment_time', 'status', 'reason', 'created_at'
    ];
    public function customer() {
        return $this->belongsTo(\App\Models\Customer::class, 'customer_id');
    }
    public function lawyer() {
        return $this->belongsTo(\App\Models\Lawyer::class, 'lawyer_id');
    }
}

