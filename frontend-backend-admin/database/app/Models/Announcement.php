<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model {
    protected $primaryKey = 'announcement_id';
    public $timestamps = false;

    protected $fillable = ['admin_id', 'title', 'content', 'publish_date'];
}
