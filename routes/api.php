<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Desa;
use App\Http\Controllers\Api\DptController;
use App\Http\Controllers\Api\Kecamatan;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PendukungController;
use App\Http\Controllers\SegmenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsiaController;

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
    Route::post("/svUser", [PendukungController::class, 'svUser']);
    Route::post("/svSegmen", [PendukungController::class, 'svSegmen']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get("/alldpt",[Kecamatan::class,"alldpt"]);
    Route::get("/getSegFr",[SegmenController::class,"getDataSegFr"]);
    Route::get("/getSegNd/{id}",[SegmenController::class,"getDataSegNd"]);
    Route::get("/getDSegNd",[SegmenController::class,"getFDataSegNd"]);
    Route::get("/usiadpt",[UsiaController::class,"getUsia"]);

    Route::get('/user/{tipe}', [PendukungController::class,'getPdkg']);
    Route::get('/userko/{tipe}', [PendukungController::class,'getKoo']);
    Route::any('/usercari', [PendukungController::class,'getPdkgCr']);
    Route::get('/pdkgdap', [PendukungController::class,'getPDapil']);
    Route::get('/tipeuser', [PendukungController::class,'getTipe']);
    Route::post('/dptls', [DptController::class,'getDataDpt']);
    Route::post('/dptlskoo', [DptController::class,'getDptKoo']);


    Route::get('/getsegmen', [PendukungController::class,'getSegmen']);//get data segmen dashboard
    Route::post('/getseg', [PendukungController::class,'getPendukungSegmen']);//get data segmen page

    Route::get('/getkorcam/{id}',[UserController::class,'getKorKecdt']);
    Route::get('/getkordes/{id}',[UserController::class,'getKorDesdt']);
    Route::get('/getKorrwdt/{kecid}/{desaid}/{norw}',[UserController::class,'getKorrwdt']);
    Route::get('/getStruk',[UserController::class,'getStruk']);


//    Route::get('/user/{tipe}', function (Request $request) {
//        return $request->user();
//    });
//    Route::get("users",[UserController::class,'index']);
    //<p className="message">Belum Terdaftar? <Link to="/daftar">Buat Akun</Link></p>
});
//NON LOGIN API, PUBLIC
Route::post("/daftar", [AuthController::class, 'daftar']);
Route::post("/login", [AuthController::class, 'login']);
Route::get("/lsKec",[Kecamatan::class,"getKec"]);

Route::get("/getKec/{id}",[Kecamatan::class,"getKecByID"]);
Route::get("/lsDesa/{id}",[Desa::class,"getDesa"]);
Route::get("/getDesa/{id}",[Desa::class,"getDesaByID"]);



/// API MOBILE PLAN DS CENTER
// Data Semua Korcam(Termasuk Segmennya) dan perolehan suara
// Data Perolehan Suara Setiap Segmen
// Data Perolehan Suara Setiap Kecamatan
// Data UMUM DPT



