<?php

use Illuminate\Database\Seeder;

class SiteMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => Str::random(10).'@gmail.com',
            'password' => Hash::make('password'),
        ]);*/
        $sitemenus = DB::connection('sqlite_seed')->select('select * from SiteMenu');
        foreach ($sitemenus as $sitemenu) {
            DB::table('site_menus')->insert([
                'id' => $sitemenu->id,
                'title' => $sitemenu->title,
                'text' => $sitemenu->text,
                'about' => $sitemenu->about,
                'is_submenu' => $sitemenu->is_submenu,
                'parent_id' => $sitemenu->parent_id,
                'placement_name' => $sitemenu->placement_name,
            ]);
        }
    }
}
