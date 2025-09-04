<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Score
 *
 * @property int $id
 * @property int $participant_id
 * @property int $judge_id
 * @property float|null $score_1
 * @property float|null $score_2
 * @property float|null $score_3
 * @property float|null $score_4
 * @property float|null $score_5
 * @property float|null $total_score
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Participant $participant
 * @property-read \App\Models\Judge $judge
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Score newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Score newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Score query()
 * @method static \Illuminate\Database\Eloquent\Builder|Score whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Score whereParticipantId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Score whereJudgeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Score whereTotalScore($value)
 * @method static \Database\Factories\ScoreFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Score extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'participant_id',
        'judge_id',
        'score_1',
        'score_2',
        'score_3',
        'score_4',
        'score_5',
        'total_score',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'score_1' => 'decimal:2',
        'score_2' => 'decimal:2',
        'score_3' => 'decimal:2',
        'score_4' => 'decimal:2',
        'score_5' => 'decimal:2',
        'total_score' => 'decimal:2',
    ];

    /**
     * Get the participant that owns the score.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    /**
     * Get the judge that owns the score.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function judge(): BelongsTo
    {
        return $this->belongsTo(Judge::class);
    }

    /**
     * Calculate and update total score.
     *
     * @return void
     */
    public function calculateTotal(): void
    {
        $scores = array_filter([
            $this->score_1,
            $this->score_2,
            $this->score_3,
            $this->score_4,
            $this->score_5,
        ]);

        $this->total_score = count($scores) > 0 ? array_sum($scores) / count($scores) : null;
    }
}