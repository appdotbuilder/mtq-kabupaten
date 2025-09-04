<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScoreRequest extends FormRequest
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
            'score_1' => 'nullable|numeric|min:0|max:100',
            'score_2' => 'nullable|numeric|min:0|max:100',
            'score_3' => 'nullable|numeric|min:0|max:100',
            'score_4' => 'nullable|numeric|min:0|max:100',
            'score_5' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string',
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
            'score_1.numeric' => 'Nilai 1 harus berupa angka.',
            'score_1.min' => 'Nilai 1 minimal 0.',
            'score_1.max' => 'Nilai 1 maksimal 100.',
            'score_2.numeric' => 'Nilai 2 harus berupa angka.',
            'score_2.min' => 'Nilai 2 minimal 0.',
            'score_2.max' => 'Nilai 2 maksimal 100.',
            'score_3.numeric' => 'Nilai 3 harus berupa angka.',
            'score_3.min' => 'Nilai 3 minimal 0.',
            'score_3.max' => 'Nilai 3 maksimal 100.',
            'score_4.numeric' => 'Nilai 4 harus berupa angka.',
            'score_4.min' => 'Nilai 4 minimal 0.',
            'score_4.max' => 'Nilai 4 maksimal 100.',
            'score_5.numeric' => 'Nilai 5 harus berupa angka.',
            'score_5.min' => 'Nilai 5 minimal 0.',
            'score_5.max' => 'Nilai 5 maksimal 100.',
        ];
    }
}