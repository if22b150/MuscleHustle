<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Schedule extends Model
{
    protected $table = 'schedules';

    protected $fillable = [
        'name',
        'client_user_id',
        'coach_user_id',
        'visible'
    ];

    protected $casts = [
        'visible' => 'boolean'
    ];

    public function sets(): HasMany {
        return $this->hasMany(Set::class, 'schedule_id', 'id');
    }

    public function client(): HasOne {
        return $this->hasOne(User::class, 'id', 'client_user_id');
    }

    public function coach(): HasOne {
        return $this->hasOne(User::class, 'id', 'coach_user_id');
    }

    public function getExercises() {
        if(empty($this->sets))
            return [];

        $exercises = [];
        $exerciseSets = [];
        $currentExercise = null;
        foreach ($this->sets as $set) {
            if(!$currentExercise) {
                $currentExercise = $set->exercise;
//                $exercises[] = ["id" => $set->exercise->id, "name" => $set->exercise->name];
            }
            if($currentExercise->id == $set->exercise->id)
                $exerciseSets[] = $set->withoutRelations();
            else {
                $exercises[] = ["exercise" => $currentExercise, "sets" => $exerciseSets];

                $exerciseSets = [];
                $exerciseSets[] = $set->withoutRelations();
                $currentExercise->id = $set->exercise->id;
            }
        }
        $exercises[] = ["exercise" => $set->exercise, "sets" => $exerciseSets];

        return $exercises;
    }
}
