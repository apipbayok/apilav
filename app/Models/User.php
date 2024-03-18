<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama',
        'nik',
        "koor",
        'alamat',
        'jk',
        'tplahir',
        'tgllahir',
        'agama',
        'rt',
        'rw',
        'hp',
        'notps',
        'kecamatan_id',
        'desa_id',
        'kawin',
        'pekerjaan',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public static function getUsers($tipe)
    {
//        if ($tipe == "Pendukung") {
//            $dt = DB::select("SELECT
//                    b.nama AS kecamatan,
//                    c.nama AS desa,
//                    a.id,
//                    a.nama,
//                    a.nik,
//                    a.alamat,
//                    a.jk,
//                    a.tplahir,
//                    a.tgllahir,
//                    a.rt,
//                    a.rw,
//                    a.hp,
//                    a.notps
//                FROM
//                    pendukung AS a
//                    INNER JOIN bandung_kec AS b ON a.kecamatan_id = b.id_kec
//                    INNER JOIN bandung_desa AS c ON a.desa_id = c.desa_id");
//        } else {
//            $dt = DB::select("SELECT
//                    b.nama AS kecamatan,
//                    c.nama AS desa,
//                    a.id,
//                    a.nama,
//                    a.nik,
//                    a.alamat,
//                    a.jk,
//                    a.tplahir,
//                    a.tgllahir,
//                    a.rt,
//                    a.rw,
//                    a.hp,
//                    a.notps
//                FROM
//                    users AS a
//                    INNER JOIN bandung_kec AS b ON a.kecamatan_id = b.id_kec
//                    INNER JOIN bandung_desa AS c ON a.desa_id = c.desa_id WHERE a.koor='$tipe'");
//        }
//        return $dt;
    }

}
