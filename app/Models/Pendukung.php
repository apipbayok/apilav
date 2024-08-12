<?php

namespace App\Models;

use App\Http\Requests\StorePendukungRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pendukung extends Model
{
    use HasFactory;

    protected $table = 'm_aiodukungan';
    protected $fillable = [
        'nama',
        'nik',
        "koo",
        'alamat',
        'jk',
        'tplahir',
        'tglahir',
        'agama',
        'rt',
        'rw',
        'hp',
        'tpsno',
        'kec_id',
        'desa_id',
        'stkawin',
        'dapil',
        'pekerjaan',
        'segmen_id',
        'subsegmen_id',
        'created_by'
    ];

    public static function getPendukung($tipe)
    {
        if ($tipe == "Pendukung") {
            $dt = DB::table("vw_pdkg")->paginate(50);
        } else {
            $dt = DB::table("vw_pdkg")->where("koo", $tipe)->paginate(50);
        }
        return $dt;
    }

    public static function getKordinator($tipe)
    {
        $dt = DB::table("vw_koo")->where("koor", $tipe)->get();
        return $dt;
    }

    public static function getPdCari($req)
    {
        $dt = [];
        if ($req['kec'] != "0") {
            $dt["kec_id"] = $req['kec'];
        }
        if ($req['des'] != "0") {
            $dt["desa_id"] = $req['des'];
        }
        if ($req['dap'] != "0") {
            $dt["dapil"] = $req['dap'];
        }
        $data = DB::table("vw_pdkg")->where($dt)->paginate(50);
        return $data;
    }

    public static function getSgCari($req)
    {
        $dt = [];
        if ($req['kec_id'] != "0") {
            $dt["kec_id"] = $req['kec'];
        }
        if ($req['desa_id'] != "0") {
            $dt["desa_id"] = $req['des'];
        }
        if ($req['dapil'] != "0") {
            $dt["dapil"] = $req['dap'];
        }
        $data = DB::table("vw_pdkg")->where($dt)->paginate(50);
        return $data;
    }

    public static function getPerdapil()
    {
        $dt = DB::select("SELECT IFNULL(COUNT(b.dapil),0)as nil,CONCAT('Dapil ',a.dapil) as dap FROM bandung_kec as a
                    LEFT JOIN m_aiodukungan as b ON b.kec_id=a.id_kec
                     GROUP BY a.dapil");
        return $dt;
    }

    public static function gettipe()
    {
        $dt = DB::select("SELECT COUNT(koo)nil, koo from m_aiodukungan WHERE !ISNULL(koo) AND koo!='KORTPS' GROUP BY koo");
        return $dt;
    }

    public static function getbysegmen()
    { // Ambil Data Untuk Dashboard
        return DB::select("SELECT a.seg_id,a.seg_nama,IF((ISNULL( a.parent ) AND ISNULL( a.code_name )),a.seg_id,IF( ISNULL( a.parent ), a.seg_id, a.parent )) AS idht,IFNULL( COUNT( b.pendukung_id ), 0 ) AS hit FROM segmen AS a LEFT JOIN m_aiodukungan AS b ON a.seg_id = b.subsegmen_id WHERE !ISNULL(a.code_name) GROUP BY a.seg_nama,a.seg_id,a.parent,a.code_name ORDER BY idht");
    }

    public static function getSegmenData($req)
    { //Ambil Data Untuk Page Setiap Segmen
        $segId = $req['subsegmen_id'];
        $kec = $req['kec_id'];
        $desa = $req['desa_id'];
        $dapil = $req['dapil'];
        return DB::SELECT(DB::RAW("CALL segmenSr($segId,$kec,$desa,$dapil)"));
    }


    public static function addData(StorePendukungRequest $request)
    {
        $data = $request->validated();
        $user = Pendukung::create($data);
        return response(new UserResource($user), 201);
    }
}
