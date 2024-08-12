<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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

     // TABEL USER-- PEMBUATAN USER LOGIN


    public function rules()
    {
        return [
            'nama' => ['required', 'string'],
            'nik' => ['required', 'string', 'unique:users,nik'],
            "koor"=>['required','string'],
            'alamat' => ['required', 'string'],
            'jk' => ['required', 'string'],
            'tplahir' => ['required', 'string'],
            'tgllahir' => ['required', 'date'],
            'agama' => ['required', 'string'],
            'rt' => ['required'],
            'rw' => ['required'],
            'hp' => ['required', 'string'],
            'notps' => ['required'],
            'kecamatan_id' => ['required','numeric'],
            'desa_id' => ['required','numeric'],
            'kawin' => ['required', 'string'],
            'pekerjaan' => ['required', 'string'],
            'parent'=>['numeric'],
            'segmen_id'=>['numeric'],
            'subsegmen_id'=>['numeric']
        ];
    }
}
