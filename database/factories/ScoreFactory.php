<?php

namespace Database\Factories;

use App\Models\Judge;
use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Score>
 */
class ScoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $score1 = fake()->randomFloat(2, 70, 100);
        $score2 = fake()->randomFloat(2, 70, 100);
        $score3 = fake()->randomFloat(2, 70, 100);
        $score4 = fake()->randomFloat(2, 70, 100);
        $score5 = fake()->randomFloat(2, 70, 100);
        
        $totalScore = ($score1 + $score2 + $score3 + $score4 + $score5) / 5;

        return [
            'participant_id' => Participant::factory(),
            'judge_id' => Judge::factory(),
            'score_1' => $score1,
            'score_2' => $score2,
            'score_3' => $score3,
            'score_4' => $score4,
            'score_5' => $score5,
            'total_score' => round($totalScore, 2),
            'notes' => fake()->boolean(40) ? fake()->sentence() : null,
        ];
    }

    /**
     * Generate high scores.
     */
    public function excellent(): static
    {
        return $this->state(fn (array $attributes) => [
            'score_1' => fake()->randomFloat(2, 90, 100),
            'score_2' => fake()->randomFloat(2, 90, 100),
            'score_3' => fake()->randomFloat(2, 90, 100),
            'score_4' => fake()->randomFloat(2, 90, 100),
            'score_5' => fake()->randomFloat(2, 90, 100),
        ]);
    }

    /**
     * Generate average scores.
     */
    public function average(): static
    {
        return $this->state(fn (array $attributes) => [
            'score_1' => fake()->randomFloat(2, 75, 85),
            'score_2' => fake()->randomFloat(2, 75, 85),
            'score_3' => fake()->randomFloat(2, 75, 85),
            'score_4' => fake()->randomFloat(2, 75, 85),
            'score_5' => fake()->randomFloat(2, 75, 85),
        ]);
    }
}