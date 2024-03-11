<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DesaModel;
use Illuminate\Http\Request;

class Desa extends Controller
{
    public function getDesa($id){
        $data=DesaModel::ambilDesa($id);
        return response()->json($data);
    }
    public function getDesaByID($id){
        $data=DesaModel::ambilDesaById($id);
        return response()->json($data);
    }
}
