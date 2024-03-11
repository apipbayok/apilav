<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KecamatanModel;

class Kecamatan extends Controller
{
    public function getKec(){
        $dt=KecamatanModel::getData();
        return response()->json($dt);
    }

    public function getKecByID($id){
        $dt=KecamatanModel::getDataById($id);
        return response()->json($dt);
    }
}
