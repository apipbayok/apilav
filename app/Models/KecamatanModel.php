<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class KecamatanModel extends Model
{
    use HasFactory;
    public static function getData(){
        return DB::select("SELECT id_kec as nil,nama as lab,dapil FROM bandung_kec");
    }
    public static function getalldpt(){
        return DB::select("SELECT SUM(dpt)as alldpt,dapil FROM bandung_kec GROUP BY dapil");
    }

    public  static function getDataById($id){
        return DB::select("SELECT id_kec as nil,nama as lab FROM bandung_kec WHERE id_kec=$id");
    }
}
