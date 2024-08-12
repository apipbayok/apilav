<?php

namespace App\Http\Controllers;

use App\Models\SegmenModel;
use Illuminate\Http\Request;

class SegmenController extends Controller
{
    public function getDataSegFr()
    {
     $data=SegmenModel::getDataFr();
     return response()->json($data);
    }
    public function getDataSegNd($idU)
    {
        $data=SegmenModel::getDataNd($idU);
        return response()->json($data);
    }
    public function getFDataSegNd()
    {
        $data=SegmenModel::getDataNdF();
        return response()->json($data);
    }
}
