<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DesaModel extends Model
{
    use HasFactory;
    public static function ambilDesa($id){
        $data=DB::select("SELECT desa_id as nil, nama as lab FROM bandung_desa WHERE bandung_kec_id=$id");
        return $data;
    }
    public static function ambilDesaById($id){
        $data=DB::select("SELECT desa_id as nil, nama as lab FROM bandung_desa WHERE desa_id=$id");
        return $data;
    }
}
