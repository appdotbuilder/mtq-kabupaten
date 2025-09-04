<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Judge
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $competition_branch
 * @property string $category
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Score> $scores
 * @property-read int|null $scores_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Judge newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Judge newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Judge query()
 * @method static \Illuminate\Database\Eloquent\Builder|Judge whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Judge whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Judge whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Judge whereCompetitionBranch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Judge whereCategory($value)
 * @method static \Database\Factories\JudgeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Judge extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'competition_branch',
        'category',
    ];

    /**
     * Get the user that owns the judge.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the scores for the judge.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function scores(): HasMany
    {
        return $this->hasMany(Score::class);
    }
}