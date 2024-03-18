<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class pendukung extends Model
{
    use HasFactory;

    public static function getPendukung($tipe)
    {
        if ($tipe == "Pendukung") {
            $dt = DB::table("vw_pdkg")->paginate(50);
        } else {
            $dt = DB::table("vw_pdkg")->where("koo", $tipe)->paginate(50);
        }
        return $dt;
    }

    public static function getPdCari($req){
        $dt=[];
        if($req['kec']!="0"){
            $dt["kec_id"]=$req['kec'];
        }
        if($req['des']!="0"){
            $dt["desa_id"]=$req['des'];
        }
        if($req['dap']!="0"){
            $dt["dapil"]=$req['dap'];
        }
        $data = DB::table("vw_pdkg")->where($dt)->paginate(50);
        return $data;
    }

    public static function getPerdapil()
    {
        $dt = DB::select("SELECT COUNT(a.dapil)nil,CONCAT('Dapil ',b.dapil) as dap FROM m_aiodukungan as a
                    INNER JOIN bandung_kec as b ON a.kec_id=b.id_kec
                     GROUP BY b.dapil");
        return $dt;
    }

    public static function gettipe(){
        $dt=DB::select("SELECT COUNT(koo)nil, koo from m_aiodukungan WHERE !ISNULL(koo) AND koo!='KORTPS' GROUP BY koo ");
        return $dt;
    }
}
