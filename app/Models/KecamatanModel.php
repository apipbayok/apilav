<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class KecamatanModel extends Model
{
    use HasFactory;
    public static function getData(){
        $data=DB::select("SELECT id_kec as nil,nama as lab,dapil FROM bandung_kec");
        return $data;
    }

    public  static function getDataById($id){
        $data=DB::select("SELECT id_kec as nil,nama as lab FROM bandung_kec WHERE id_kec=$id");
        return $data;
    }
}
