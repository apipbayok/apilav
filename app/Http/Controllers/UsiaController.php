<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UsiaModel;


class UsiaController extends Controller
{
    public function getUsia(){
        $data=UsiaModel::getDataUsia();
        return response()->json($data);
    }
}
