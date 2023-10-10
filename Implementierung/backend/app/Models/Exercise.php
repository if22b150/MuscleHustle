<?php

namespace App\Models;

use App\Enums\EExerciseType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Exercise extends Model
{
    protected $table = 'exercises';

    protected $fillable = [
        'name',
        'video_link',
        'type',
        'description'
    ];

    protected $casts = [
        'type' => EExerciseType::class
    ];

    public function muscleGroups(): BelongsToMany {
        return $this->belongsToMany(MuscleGroup::class, 'muscle_group_exercises', 'exercise_id', 'muscle_group_id');
    }
}
