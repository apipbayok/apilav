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
        'password',
        'parent',
        'segmen_id',
        'subsegmen_id'
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

    }

    public static function getkorcamqr($idkec)
    {
        return DB::select("SELECT * FROM users WHERE kecamatan_id=$idkec AND koor='KORCAM'");
    }
    public static function getkordesqr($iddesa)
    {
        return DB::table('users')->where("desa_id",$iddesa)->where("koor","KORDES")->get();
    }
    public static function getkorrwqr($idkec,$iddesa,$norw)
    {
        return DB::table('users')->where("desa_id",$iddesa)->where("kecamatan_id",$idkec)->where("rw",$norw)->where("koor","KORRW")->get();
    }
//    public static function getkorrwqr($data)
//    {
//
//    }
    public static function getStrukturData()
    {
        return DB::select("SELECT COUNT(id)as nil,koor FROM users WHERE !ISNULL(koor) GROUP BY koor");
    }
}
