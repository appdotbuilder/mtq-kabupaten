<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    /**
     * Display competition results.
     */
    public function index(Request $request)
    {
        $query = Participant::query()
            ->where('status', 'Lulus')
            ->with(['scores']);

        // Apply filters
        if ($request->filled('branch')) {
            $query->where('competition_branch', $request->branch);
        }
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }
        if ($request->filled('district')) {
            $query->where('district', $request->district);
        }

        // Get participants and calculate rankings
        $participants = $query->get()
            ->map(function ($participant) {
                return [
                    'id' => $participant->id,
                    'participant_number' => $participant->participant_number,
                    'name' => $participant->name,
                    'district' => $participant->district,
                    'competition_branch' => $participant->competition_branch,
                    'category' => $participant->category,
                    'type' => $participant->type,
                    'average_score' => $participant->average_score,
                ];
            })
            ->filter(function ($participant) {
                return $participant['average_score'] !== null;
            })
            ->sortByDesc('average_score')
            ->values()
            ->map(function ($participant, $index) {
                $participant['rank'] = $index + 1;
                return $participant;
            });

        return Inertia::render('results/index', [
            'participants' => $participants,
            'filters' => $request->only(['branch', 'category', 'type', 'district'])
        ]);
    }

    /**
     * Display detailed result for a participant.
     */
    public function show(Participant $participant)
    {
        if ($participant->status !== 'Lulus') {
            abort(404, 'Hasil tidak ditemukan.');
        }

        $participant->load(['scores.judge']);

        return Inertia::render('results/show', [
            'participant' => $participant
        ]);
    }
}