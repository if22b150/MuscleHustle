<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Set extends Model
{
    protected $table = 'exercises';

    protected $fillable = [
        'wight',
        'duration',
        'reputations',
        'rpe',
        'break',
        'order',
        'schedule_id',
        'exercise_id'
    ];

    public function exercise(): BelongsTo {
        return $this->belongsTo(Exercise::class, 'exercise_id');
    }

    public function schedule(): BelongsTo {
        return $this->belongsTo(Schedule::class, 'schedule_id');
    }
}
