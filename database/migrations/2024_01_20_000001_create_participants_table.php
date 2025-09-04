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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->string('photo')->nullable()->comment('Foto peserta');
            $table->string('nik')->unique()->comment('NIK peserta');
            $table->string('name')->comment('Nama peserta');
            $table->date('birth_date')->comment('Tanggal lahir');
            $table->enum('gender', ['Putra', 'Putri'])->comment('Jenis kelamin');
            $table->string('district')->comment('Kecamatan');
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
            ])->comment('Cabang lomba');
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
            ])->comment('Golongan peserta');
            $table->enum('type', ['Putra', 'Putri'])->comment('Jenis peserta');
            $table->enum('status', ['Belum Verifikasi', 'Lulus', 'Tidak Lulus'])->default('Belum Verifikasi')->comment('Status verifikasi');
            $table->text('notes')->nullable()->comment('Keterangan');
            $table->string('participant_number')->nullable()->unique()->comment('Nomor peserta');
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['competition_branch', 'category', 'type']);
            $table->index('status');
            $table->index('district');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};