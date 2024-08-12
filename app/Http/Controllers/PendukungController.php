<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePendukungRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\pendukung;
use Illuminate\Http\Request;

class PendukungController extends Controller
{
    public  function svUser(StorePendukungRequest $request){
    $data =Pendukung::addData($request);
    return response()->json($data);
    }

    public  function svSegmen(StorePendukungRequest $request){
        $data =Pendukung::addData($request);
        return response()->json($data);
    }
    public function getPdkg($tipe){
        $data=pendukung::getPendukung($tipe);
        return response()->json($data);
    }
    public function getKoo($tipe){
        $data=pendukung::getKordinator($tipe);
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
    public function getSegmen(){
        $data=pendukung::getbysegmen();
        return response()->json($data);
    }

    public function getPendukungSegmen(Request $req){
        $data=pendukung::getSegmenData($req);
        return response()->json($data);
    }
}
