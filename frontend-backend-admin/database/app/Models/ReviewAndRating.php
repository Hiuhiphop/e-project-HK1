<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReviewAndRating extends Model {
    protected $primaryKey = 'review_id';
    public $timestamps = false;

    protected $fillable = ['appointment_id', 'rating_score', 'review_text', 'review_date'];
}
