<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MuscleGroup extends Model
{
    protected $table = 'muscle_groups';

    protected $fillable = [
        'name'
    ];

    public function muscleGroups(): BelongsToMany {
        return $this->belongsToMany(Exercise::class, 'muscle_group_exercises', 'muscle_group_id', 'exercise_id');
    }
}
