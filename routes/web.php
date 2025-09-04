<?php

use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\JudgeController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main MTQ application page - shows results for public
Route::get('/', [ResultController::class, 'index'])->name('home');

// Public registration form
Route::get('/daftar', [ParticipantController::class, 'create'])->name('participants.register');
Route::post('/daftar', [ParticipantController::class, 'store'])->name('participants.store');

// Public results pages
Route::get('/hasil', [ResultController::class, 'index'])->name('results.index');
Route::get('/hasil/{participant}', [ResultController::class, 'show'])->name('results.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // All authenticated users can view their own data
    Route::resource('participants', ParticipantController::class)->except(['create', 'store']);
    Route::resource('judges', JudgeController::class);
    Route::resource('scores', ScoreController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
