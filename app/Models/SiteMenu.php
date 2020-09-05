<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteMenu extends Model
{
    /*
    *
    * Get the post that owns the comment.
    */
    public function ParentMenu()
    {
        return $this->belongsTo('App\Models\SiteMenu', 'parent_id', 'id');
    }
}
