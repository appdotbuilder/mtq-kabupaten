<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJudgeRequest;
use App\Http\Requests\UpdateJudgeRequest;
use App\Models\Judge;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class JudgeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $judges = Judge::with('user')->latest()->paginate(15);

        return Inertia::render('judges/index', [
            'judges' => $judges
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('judges/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJudgeRequest $request)
    {
        $data = $request->validated();
        
        // Create user account for judge
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'juri',
        ]);

        // Create judge record
        $judge = Judge::create([
            'user_id' => $user->id,
            'name' => $data['name'],
            'competition_branch' => $data['competition_branch'],
            'category' => $data['category'],
        ]);

        return redirect()->route('judges.show', $judge)
            ->with('success', 'Data juri berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Judge $judge)
    {
        $judge->load('user');

        return Inertia::render('judges/show', [
            'judge' => $judge
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Judge $judge)
    {
        $judge->load('user');

        return Inertia::render('judges/edit', [
            'judge' => $judge
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJudgeRequest $request, Judge $judge)
    {
        $data = $request->validated();
        
        // Update judge record
        $judge->update([
            'name' => $data['name'],
            'competition_branch' => $data['competition_branch'],
            'category' => $data['category'],
        ]);

        // Update user record
        $updateUser = [
            'name' => $data['name'],
            'email' => $data['email'],
        ];
        
        if (!empty($data['password'])) {
            $updateUser['password'] = Hash::make($data['password']);
        }
        
        $judge->user()->update($updateUser);

        return redirect()->route('judges.show', $judge)
            ->with('success', 'Data juri berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Judge $judge)
    {
        $judge->user()->delete(); // This will also delete the judge record due to cascade
        
        return redirect()->route('judges.index')
            ->with('success', 'Data juri berhasil dihapus.');
    }
}