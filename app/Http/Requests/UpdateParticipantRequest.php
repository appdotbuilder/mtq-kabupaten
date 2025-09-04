<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateParticipantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $participantId = $this->route('participant')->id;
        
        return [
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'nik' => 'required|string|size:16|unique:participants,nik,' . $participantId,
            'name' => 'required|string|max:255',
            'birth_date' => 'required|date|before:today',
            'gender' => 'required|in:Putra,Putri',
            'district' => 'required|string|max:255',
            'competition_branch' => 'required|in:Tafsir Al-Qur`an,Karya Tulis Ilmiah Al-Qur`an,Musabaqah Hafalan Hadits,Tilawah Al-Qur`an,Hifzhil Al-Qur`an,Khattil Al-Qur`an,Syarhil Al-Qur`an,Fahmil Al-Qur`an,Barzanji',
            'category' => 'required|string',
            'type' => 'required|in:Putra,Putri',
            'status' => 'required|in:Belum Verifikasi,Lulus,Tidak Lulus',
            'notes' => 'nullable|string',
            'participant_number' => 'nullable|string|unique:participants,participant_number,' . $participantId,
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nik.required' => 'NIK wajib diisi.',
            'nik.size' => 'NIK harus terdiri dari 16 digit.',
            'nik.unique' => 'NIK ini sudah terdaftar oleh peserta lain.',
            'name.required' => 'Nama lengkap wajib diisi.',
            'birth_date.required' => 'Tanggal lahir wajib diisi.',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini.',
            'gender.required' => 'Jenis kelamin wajib dipilih.',
            'district.required' => 'Kecamatan wajib diisi.',
            'competition_branch.required' => 'Cabang lomba wajib dipilih.',
            'category.required' => 'Golongan wajib dipilih.',
            'type.required' => 'Jenis peserta wajib dipilih.',
            'status.required' => 'Status verifikasi wajib dipilih.',
            'participant_number.unique' => 'Nomor peserta ini sudah digunakan.',
            'photo.image' => 'File harus berupa gambar.',
            'photo.mimes' => 'Format foto harus JPEG, PNG, atau JPG.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
        ];
    }
}