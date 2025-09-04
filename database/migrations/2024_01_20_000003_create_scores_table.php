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
        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained()->onDelete('cascade');
            $table->foreignId('judge_id')->constrained()->onDelete('cascade');
            $table->decimal('score_1', 8, 2)->nullable()->comment('Nilai kriteria 1');
            $table->decimal('score_2', 8, 2)->nullable()->comment('Nilai kriteria 2');
            $table->decimal('score_3', 8, 2)->nullable()->comment('Nilai kriteria 3');
            $table->decimal('score_4', 8, 2)->nullable()->comment('Nilai kriteria 4');
            $table->decimal('score_5', 8, 2)->nullable()->comment('Nilai kriteria 5');
            $table->decimal('total_score', 8, 2)->nullable()->comment('Total nilai');
            $table->text('notes')->nullable()->comment('Catatan juri');
            $table->timestamps();
            
            // Composite unique constraint
            $table->unique(['participant_id', 'judge_id']);
            
            // Indexes
            $table->index('participant_id');
            $table->index('judge_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scores');
    }
};