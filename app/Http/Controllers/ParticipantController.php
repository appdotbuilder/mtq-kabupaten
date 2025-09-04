<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreParticipantRequest;
use App\Http\Requests\UpdateParticipantRequest;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Participant::query();

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
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $participants = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('participants/index', [
            'participants' => $participants,
            'filters' => $request->only(['branch', 'category', 'type', 'district', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('participants/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreParticipantRequest $request)
    {
        $participant = Participant::create($request->validated());

        return redirect()->route('participants.show', $participant)
            ->with('success', 'Pendaftaran berhasil! Data Anda akan diverifikasi oleh panitia.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant)
    {
        $participant->load('scores.judge');

        return Inertia::render('participants/show', [
            'participant' => $participant
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Participant $participant)
    {
        return Inertia::render('participants/edit', [
            'participant' => $participant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateParticipantRequest $request, Participant $participant)
    {
        $data = $request->validated();

        // Auto-generate participant number if status is changed to Lulus and no number exists
        if ($data['status'] === 'Lulus' && !$participant->participant_number) {
            $data['participant_number'] = $participant->generateParticipantNumber();
        }

        $participant->update($data);

        return redirect()->route('participants.show', $participant)
            ->with('success', 'Data peserta berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant)
    {
        $participant->delete();

        return redirect()->route('participants.index')
            ->with('success', 'Data peserta berhasil dihapus.');
    }
}