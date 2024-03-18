<?php

namespace App\Http\Controllers;

use App\Models\pendukung;
use Illuminate\Http\Request;

class PendukungController extends Controller
{
    public function getPdkg($tipe){
        $data=pendukung::getPendukung($tipe);
        return response()->json($data);
    }

    public function getPdkgCr(Request $req){
        $data=pendukung::getPdCari($req);
        return response()->json($data);
    }

    public function getPDapil(){
        $data=pendukung::getPerdapil();
        return response()->json($data);
    }
    public function getTipe(){
        $data=pendukung::gettipe();
        return response()->json($data);
    }
}
