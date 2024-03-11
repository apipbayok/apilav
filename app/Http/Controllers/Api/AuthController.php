<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        {
            $credentials = $request->validated();
            if (!Auth::attempt($credentials)) {
                return response([
                    'message' => 'Provided email or password is incorrect'
                ], 422);
            }

            /** @var \App\Models\User $user */
            $user = Auth::user();
            $token = $user->createToken('main')->plainTextToken;
            return response(compact('user', 'token'));
        }
    }

    public function daftar(SignupRequest $request)
    {
        $data = $request->validated();
//        print_r($data);
        /** @var \App\Models\User $user */
        $user=User::create([
            "nama" => $data["nama"],
            "nik" => $data["nik"],
            "koor" => $data["koor"],
            "password" => bcrypt($data["hp"]),
            "alamat"=>$data['alamat'],
            "jk"=>$data['jk'],
            "tplahir"=>$data['tplahir'],
            "tgllahir"=>$data['tgllahir'],
            "agama"=>$data['agama'],
            "rt"=>$data['rt'],
            "rw"=>$data['rw'],
            "hp"=>$data['hp'],
            "notps"=>$data['notps'],
            "kecamatan_id"=>$data['kecamatan'],
            "desa_id"=>$data['desa'],
            "kawin"=>$data['kawin'],
            "pekerjaan"=>$data['pekerjaan'],
        ]);
        $token = $user->createToken("main")->plainTextToken;
        return response(compact("user","token"));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user=$request->user();
        $user->currentAccessToken()->delete();
        return response("",204);
    }
}
