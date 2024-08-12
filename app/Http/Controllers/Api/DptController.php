<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DptModel;

class DptController extends Controller
{

    public function getDataDpt(Request $req){
        $data=DptModel::getDptData($req['data']);
        return response()->json($data);
    }
    public function getDptKoo(Request $req){
        $data=DptModel::getDptKools($req['data']);
        return response()->json($data);
    }
}

