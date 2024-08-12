<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SegmenModel extends Model
{
    protected $table = 'segmen';
    public static function getDataFr(){
        return DB::select("SELECT seg_id as nil,seg_nama as lab,parent as par,code_name FROM segmen WHERE ISNULL(parent)");
    }
    public static function getDataNd($idU){
        return DB::select("SELECT seg_id as nil,seg_nama as lab,parent as par,code_name FROM segmen WHERE parent=$idU");
    }
    public static function getDataNdF(){
        return DB::select("SELECT seg_id as nil,seg_nama as lab,parent as par,code_name FROM segmen WHERE !ISNULL(parent)");
    }
}
