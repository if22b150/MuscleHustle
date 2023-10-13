<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Schedule extends Model
{
    protected $table = 'exercises';

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
        return $this->hasMany(Set::class, 'exercise_id', 'id');
    }

    public function client(): HasOne {
        return $this->hasOne(User::class, 'id', 'client_user_id');
    }

    public function coach(): HasOne {
        return $this->hasOne(User::class, 'id', 'coach_user_id');
    }
}
