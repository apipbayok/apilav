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
            'kecamatan' => ['required','numeric'],
            'desa' => ['required','numeric'],
            'kawin' => ['required', 'string'],
            'pekerjaan' => ['required', 'string'],
        ];
    }
}
