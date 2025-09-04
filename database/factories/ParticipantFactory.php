<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Participant>
 */
class ParticipantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $branches = [
            'Tafsir Al-Qur`an',
            'Karya Tulis Ilmiah Al-Qur`an', 
            'Musabaqah Hafalan Hadits',
            'Tilawah Al-Qur`an',
            'Hifzhil Al-Qur`an',
            'Khattil Al-Qur`an',
            'Syarhil Al-Qur`an',
            'Fahmil Al-Qur`an',
            'Barzanji'
        ];

        $categories = [
            '10 Juz', '30 Juz', '5 Juz dan Tilawah', '1 Juz dan Tilawah', '20 Juz', 
            'Anak-anak', 'Dewasa', 'Remaja'
        ];

        $districts = [
            'Bengkalis', 'Bantan', 'Bukit Batu', 'Mandau', 'Rupat', 
            'Rupat Utara', 'Siak Kecil', 'Pinggir', 'Talang Muandau', 
            'Bathin Solapan', 'Bandar Laksamana'
        ];

        $genders = ['Putra', 'Putri'];

        return [
            'photo' => null,
            'nik' => fake()->unique()->numerify('##############'),
            'name' => fake()->name(),
            'birth_date' => fake()->dateTimeBetween('-30 years', '-10 years')->format('Y-m-d'),
            'gender' => fake()->randomElement($genders),
            'district' => fake()->randomElement($districts),
            'competition_branch' => fake()->randomElement($branches),
            'category' => fake()->randomElement($categories),
            'type' => fake()->randomElement($genders),
            'status' => fake()->randomElement(['Belum Verifikasi', 'Lulus', 'Tidak Lulus']),
            'notes' => fake()->boolean(30) ? fake()->sentence() : null,
            'participant_number' => null,
        ];
    }

    /**
     * Indicate that the participant is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Lulus',
            'participant_number' => 'TQ-' . str_pad((string)fake()->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
        ]);
    }

    /**
     * Indicate that the participant is pending verification.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Belum Verifikasi',
            'participant_number' => null,
        ]);
    }

    /**
     * Indicate that the participant is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'Tidak Lulus',
            'participant_number' => null,
            'notes' => 'Dokumen tidak lengkap atau tidak memenuhi syarat.',
        ]);
    }
}