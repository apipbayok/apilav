<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Desa;
use App\Http\Controllers\Api\Kecamatan;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PendukungController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post("/logout", [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/user/{tipe}', [PendukungController::class,'getPdkg']);
    Route::any('/usercari', [PendukungController::class,'getPdkgCr']);
    Route::get('/pdkgdap', [PendukungController::class,'getPDapil']);
    Route::get('/tipeuser', [PendukungController::class,'getTipe']);
//    Route::get('/user/{tipe}', function (Request $request) {
//        return $request->user();
//    });
//    Route::get("users",[UserController::class,'index']);
});
//NON LOGIN API, PUBLIC
Route::post("/daftar", [AuthController::class, 'daftar']);
Route::post("/login", [AuthController::class, 'login']);
Route::get("/lsKec",[Kecamatan::class,"getKec"]);
Route::get("/getKec/{id}",[Kecamatan::class,"getKecByID"]);
Route::get("/lsDesa/{id}",[Desa::class,"getDesa"]);
Route::get("/getDesa/{id}",[Desa::class,"getDesaByID"]);


