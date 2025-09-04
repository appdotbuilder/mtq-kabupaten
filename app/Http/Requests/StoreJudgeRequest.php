<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJudgeRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'competition_branch' => 'required|in:Tafsir Al-Qur`an,Karya Tulis Ilmiah Al-Qur`an,Musabaqah Hafalan Hadits,Tilawah Al-Qur`an,Hifzhil Al-Qur`an,Khattil Al-Qur`an,Syarhil Al-Qur`an,Fahmil Al-Qur`an,Barzanji',
            'category' => 'required|string',
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
            'name.required' => 'Nama juri wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah digunakan.',
            'password.required' => 'Password wajib diisi.',
            'password.min' => 'Password minimal 6 karakter.',
            'competition_branch.required' => 'Cabang lomba wajib dipilih.',
            'category.required' => 'Golongan wajib dipilih.',
        ];
    }
}