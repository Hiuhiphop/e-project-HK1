<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AvailabilitySlot extends Model {
    protected $primaryKey = 'slot_id';
    public $timestamps = false;

    protected $fillable = [
        'lawyer_id', 'slot_date', 'start_time', 'end_time', 'status'
    ];
}
