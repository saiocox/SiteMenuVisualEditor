<?php

use App\Models\SiteMenu;
use App\Models\SiteLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('admin')->group(function () {
    Route::get('sitemenus', function() {
        return SiteMenu::paginate(10);
    });

    Route::get('sitemenus/{id}', function($id) {
        return SiteMenu::find($id);
    });

    Route::get('sitemenus/{id}/links', function($id) {
        return SiteLink::where('site_menu_id', $id)->paginate(10);
    });

    Route::post('sitemenus', function(Request $request) {
        return SiteMenu::create($request->all);
    });

    Route::put('sitemenus/{id}', function(Request $request, $id) {
        $sitemenu = SiteMenu::findOrFail($id);
        $sitemenu->update($request->all());
        return $sitemenu;
    });

    Route::delete('sitemenus/{id}', function($id) {
        SiteMenu::find($id)->delete();
        return 204;
    });
});