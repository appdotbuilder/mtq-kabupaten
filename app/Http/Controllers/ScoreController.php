<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreScoreRequest;
use App\Http\Requests\UpdateScoreRequest;
use App\Models\Participant;
use App\Models\Score;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        
        if (!$user || !$user->isJuri()) {
            abort(403, 'Hanya juri yang dapat mengakses halaman ini.');
        }

        $judge = $user->judge;
        
        // Get participants for this judge's branch and category
        $participants = Participant::where('competition_branch', $judge->competition_branch)
            ->where('category', $judge->category)
            ->where('status', 'Lulus')
            ->with(['scores' => function ($query) use ($judge) {
                $query->where('judge_id', $judge->id);
            }])
            ->latest()
            ->paginate(15);

        return Inertia::render('scores/index', [
            'participants' => $participants,
            'judge' => $judge
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = Auth::user();
        
        if (!$user || !$user->isJuri()) {
            abort(403, 'Hanya juri yang dapat mengakses halaman ini.');
        }

        $participant = Participant::findOrFail($request->participant_id);
        $judge = $user->judge;

        // Check if judge can score this participant
        if ($participant->competition_branch !== $judge->competition_branch || 
            $participant->category !== $judge->category) {
            abort(403, 'Anda tidak berwenang menilai peserta ini.');
        }

        // Check if score already exists
        $existingScore = Score::where('participant_id', $participant->id)
            ->where('judge_id', $judge->id)
            ->first();

        if ($existingScore) {
            return redirect()->route('scores.edit', $existingScore);
        }

        return Inertia::render('scores/create', [
            'participant' => $participant,
            'judge' => $judge
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScoreRequest $request)
    {
        $user = Auth::user();
        $judge = $user->judge;
        
        $data = $request->validated();
        $data['judge_id'] = $judge->id;
        
        $score = Score::create($data);
        $score->calculateTotal();
        $score->save();

        return redirect()->route('scores.index')
            ->with('success', 'Nilai berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Score $score)
    {
        $user = Auth::user();
        
        // Check if user can view this score
        if (!$user->isPanitia() && $score->judge_id !== optional($user->judge)->id) {
            abort(403, 'Anda tidak berwenang melihat nilai ini.');
        }

        $score->load(['participant', 'judge']);

        return Inertia::render('scores/show', [
            'score' => $score
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Score $score)
    {
        $user = Auth::user();
        
        // Only judge who created the score can edit it
        if ($score->judge_id !== optional($user->judge)->id) {
            abort(403, 'Anda tidak berwenang mengedit nilai ini.');
        }

        $score->load(['participant', 'judge']);

        return Inertia::render('scores/edit', [
            'score' => $score
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScoreRequest $request, Score $score)
    {
        $user = Auth::user();
        
        // Only judge who created the score can update it
        if ($score->judge_id !== optional($user->judge)->id) {
            abort(403, 'Anda tidak berwenang mengedit nilai ini.');
        }

        $score->update($request->validated());
        $score->calculateTotal();
        $score->save();

        return redirect()->route('scores.index')
            ->with('success', 'Nilai berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Score $score)
    {
        $user = Auth::user();
        
        // Only judge who created the score or panitia can delete it
        if (!$user->isPanitia() && $score->judge_id !== optional($user->judge)->id) {
            abort(403, 'Anda tidak berwenang menghapus nilai ini.');
        }

        $score->delete();

        return redirect()->route('scores.index')
            ->with('success', 'Nilai berhasil dihapus.');
    }
}