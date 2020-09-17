<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteLink extends Model
{
    /*
    *
    * Get the site menu that owns the link.
    */
    public function SiteMenu()
    {
        return $this->belongsTo('App\Models\SiteMenu', 'site_menu_id', 'id');
    }
}
