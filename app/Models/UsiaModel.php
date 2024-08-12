<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UsiaModel extends Model
{
    use HasFactory;
    public static function getDataUsia(){
        $data=DB::select("SELECT * FROM usia");
        return $data;
    }
}
