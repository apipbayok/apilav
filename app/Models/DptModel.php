<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DptModel extends Model
{
    protected $table = 'dpt2024aio';

    public  static function getDptData($req){
        return DB::select("SELECT
	a.KECAMATAN AS kec_id,
	a.KELURAHAN AS desa_id,
	a.KECAMATAN AS kecamatan,
	a.KELURAHAN AS desa,
	a.NAMA AS nama,
	a.TEMPATLAHIR AS tplahir,
	a.TANGGALLAHIR AS tglahir,
	a.STSKAWIN AS stkawin,
	a.KELAMIN AS jk,
	a.ALAMAT AS alamat,
	a.RT AS rt,
	a.RW AS rw,
	a.TPS AS tpsno,
	a.NIK AS nik,
	b.dapil
FROM
	dpt2024aio AS a
	INNER JOIN bandung_kec AS b	ON a.KECAMATAN = b.id_kec
	INNER JOIN bandung_desa AS c ON a.KELURAHAN = c.desa_id
	WHERE a.NIK LIKE '$req%' OR a.NAMA LIKE '$req%' LIMIT 10");
    }

    public  static function getDptKools($req){
        return DB::select("SELECT
	a.KECAMATAN AS kecamatan_id,
	a.KELURAHAN AS desa_id,
	a.NAMA AS nama,
	a.TEMPATLAHIR AS tplahir,
	a.TANGGALLAHIR AS tgllahir,
	a.STSKAWIN AS kawin,
	a.KELAMIN AS jk,
	a.ALAMAT AS alamat,
	a.RT AS rt,
	a.RW AS rw,
	a.TPS AS notps,
	a.NIK AS nik,
	b.dapil
FROM
	dpt2024aio AS a
	INNER JOIN bandung_kec AS b	ON a.KECAMATAN = b.id_kec
	INNER JOIN bandung_desa AS c ON a.KELURAHAN = c.desa_id
	WHERE a.NIK LIKE '$req%' OR a.NAMA LIKE '$req%' LIMIT 10");
    }
}
