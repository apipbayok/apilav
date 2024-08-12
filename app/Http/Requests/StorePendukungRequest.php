<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePendukungRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */

    // KE TABEL AIO_PENDUKUNG MENYIMPAN SEMUA DATA PENDUKUNG, SEGMEN DAN KOORDINATOR


    public function rules()
    {
        return [
            'nama' => 'required|string|max:55',
            'nik' => 'required|string|unique:m_aiodukungan,nik',
            "koo" => 'string',
            'alamat' => 'required|string',
            'jk' => 'required|string',
            'tplahir' => 'required|string',
            'tglahir' => 'required',
            'agama' => 'string',
            'rt' => 'required',
            'rw' => 'required',
            'hp' => 'required|string',
            'kec_id' => 'required|numeric',
            'desa_id' => 'required|numeric',
            'stkawin' => 'string',
            'pekerjaan' => 'string',
            'dapil' => 'numeric',
            'tpsno' => 'numeric',
            'segmen_id' => 'numeric',
            'subsegmen_id' => 'numeric',
            'created_by' => 'numeric',
            'parent' => 'numeric',
        ];

    }
}
