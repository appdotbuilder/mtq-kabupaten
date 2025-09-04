<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Judge>
 */
class JudgeFactory extends Factory
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

        return [
            'user_id' => User::factory()->create(['role' => 'juri'])->id,
            'name' => fake()->name(),
            'competition_branch' => fake()->randomElement($branches),
            'category' => fake()->randomElement($categories),
        ];
    }

    /**
     * Create judge for Tilawah branch.
     */
    public function tilawah(): static
    {
        return $this->state(fn (array $attributes) => [
            'competition_branch' => 'Tilawah Al-Qur`an',
            'category' => fake()->randomElement(['Dewasa', 'Remaja', 'Anak-anak']),
        ]);
    }

    /**
     * Create judge for Tahfidz branch.
     */
    public function tahfidz(): static
    {
        return $this->state(fn (array $attributes) => [
            'competition_branch' => 'Hifzhil Al-Qur`an',
            'category' => fake()->randomElement(['30 Juz', '20 Juz', '10 Juz', '5 Juz dan Tilawah']),
        ]);
    }
}