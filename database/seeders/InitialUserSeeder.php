<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class InitialUserSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create initial panitia account
        User::create([
            'name' => 'Panitia MTQ',
            'email' => 'lptqrohil@mtq.com',
            'password' => Hash::make('Super1'),
            'role' => 'panitia',
            'email_verified_at' => now(),
        ]);
        
        // Create some sample participants for testing
        \App\Models\Participant::factory(20)->create();
        \App\Models\Participant::factory(15)->verified()->create();
        \App\Models\Participant::factory(5)->rejected()->create();
        
        // Create sample judges
        \App\Models\Judge::factory(5)->create();
        
        // Create sample scores for verified participants
        $verifiedParticipants = \App\Models\Participant::where('status', 'Lulus')->get();
        $judges = \App\Models\Judge::all();
        
        foreach ($verifiedParticipants as $participant) {
            // Each participant gets scores from 2-3 judges
            $judgeCount = random_int(2, min(3, $judges->count()));
            $selectedJudges = $judges->random($judgeCount);
            
            foreach ($selectedJudges as $judge) {
                \App\Models\Score::factory()->create([
                    'participant_id' => $participant->id,
                    'judge_id' => $judge->id,
                ]);
            }
        }
    }
}