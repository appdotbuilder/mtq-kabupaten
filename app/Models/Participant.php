<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Participant
 *
 * @property int $id
 * @property string|null $photo
 * @property string $nik
 * @property string $name
 * @property \Carbon\Carbon $birth_date
 * @property string $gender
 * @property string $district
 * @property string $competition_branch
 * @property string $category
 * @property string $type
 * @property string $status
 * @property string|null $notes
 * @property string|null $participant_number
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Score> $scores
 * @property-read int|null $scores_count
 * @property-read float|null $average_score
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Participant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Participant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Participant query()
 * @method static \Illuminate\Database\Eloquent\Builder|Participant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Participant whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Participant whereNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Participant whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Participant whereCompetitionBranch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Participant whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Participant whereDistrict($value)
 * @method static \Database\Factories\ParticipantFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Participant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'photo',
        'nik',
        'name',
        'birth_date',
        'gender',
        'district',
        'competition_branch',
        'category',
        'type',
        'status',
        'notes',
        'participant_number',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
    ];

    /**
     * Get the scores for the participant.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function scores(): HasMany
    {
        return $this->hasMany(Score::class);
    }

    /**
     * Get the average score for the participant.
     *
     * @return float|null
     */
    public function getAverageScoreAttribute(): ?float
    {
        $scores = $this->scores()->whereNotNull('total_score')->pluck('total_score');
        
        return $scores->count() > 0 ? $scores->average() : null;
    }

    /**
     * Generate participant number.
     *
     * @return string
     */
    public function generateParticipantNumber(): string
    {
        $branchCode = [
            'Tafsir Al-Qur`an' => 'TQ',
            'Karya Tulis Ilmiah Al-Qur`an' => 'KT',
            'Musabaqah Hafalan Hadits' => 'MH',
            'Tilawah Al-Qur`an' => 'TL',
            'Hifzhil Al-Qur`an' => 'HQ',
            'Khattil Al-Qur`an' => 'KQ',
            'Syarhil Al-Qur`an' => 'SQ',
            'Fahmil Al-Qur`an' => 'FQ',
            'Barzanji' => 'BZ'
        ];

        $code = $branchCode[$this->competition_branch] ?? 'XX';
        $sequence = str_pad((string)$this->id, 4, '0', STR_PAD_LEFT);
        
        return $code . '-' . $sequence;
    }

    /**
     * Scope a query to only include verified participants.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeVerified($query)
    {
        return $query->where('status', 'Lulus');
    }
}