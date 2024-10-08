<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        //////SIMPAN DATA UPENGGUNA SISTEM
        return [
            'nama' => 'required|string|max:55',
            'nik' => 'required|string|unique:users,nik',
            "koor"=>'required|string',
            'alamat' => 'required|string',
            'jk' => 'required|string',
            'tplahir' => 'required|string',
            'tgllahir' => 'required',
            'agama' => 'required|string',
            'rt' => 'required',
            'rw' => 'required',
            'hp' => 'required|string',
            'notps' => 'required',
            'kecamatan_id' => 'required|numeric',
            'desa_id' => 'required|numeric',
            'kawin' => 'required',
            'pekerjaan' => 'required',
            'parent' => 'numeric',
            'segmen_id'=>'numeric',
            'subsegmen_id'=>'numeric'
        ];

    }
}
