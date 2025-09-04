<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('judges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Nama juri');
            $table->enum('competition_branch', [
                'Tafsir Al-Qur`an',
                'Karya Tulis Ilmiah Al-Qur`an', 
                'Musabaqah Hafalan Hadits',
                'Tilawah Al-Qur`an',
                'Hifzhil Al-Qur`an',
                'Khattil Al-Qur`an',
                'Syarhil Al-Qur`an',
                'Fahmil Al-Qur`an',
                'Barzanji'
            ])->comment('Cabang lomba yang ditugaskan');
            $table->enum('category', [
                '10 Juz', '30 Juz', '5 Juz dan Tilawah', '1 Juz dan Tilawah', '20 Juz', 
                'Anak-anak', 'Bahasa Indonesia Beserta Hafalan 30 Juz Dan Tafsir Juz XV (Lima Belas)',
                'Bahasa Arab Beserta Hafalan 30 Juz Dan Tafsir Juz XV (Lima Belas)',
                'Bahasa Inggris Beserta Hafalan Juz 1 s/d 17 Dan Tafsir Juz XIII (Tiga Belas)',
                'Cacat Netra', 'Dewasa', 'Dekorasi', 'Dewasa Qira`at Mujawwad', 
                'Dewasa Qira`at Murattal', 'Fahmil Quran Putri', 'Fahmil Quran Putra',
                'Hafalan 500 Hadits tanpa Sanad', 'Hafalan 100 Hadits dengan Sanad',
                'Hiasan Mushaf', 'Kaligrafi Digital', 'Kontemporer', 
                'Karya Tulis Ilmiah Hadits', 'KTIQ', 'Remaja', 'Naskah',
                'Remaja Qira`at Murattal', 'Tartil Al-Qur`an', 
                'Syarhil Quran Putra', 'Syarhil Quran Putri'
            ])->comment('Golongan yang ditugaskan');
            $table->timestamps();
            
            // Indexes
            $table->index(['competition_branch', 'category']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('judges');
    }
};