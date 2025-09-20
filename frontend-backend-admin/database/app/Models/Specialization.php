<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialization extends Model {
    protected $primaryKey = 'specialization_id';
    public $timestamps = false;

    protected $fillable = ['specialization_name', 'description'];
}
