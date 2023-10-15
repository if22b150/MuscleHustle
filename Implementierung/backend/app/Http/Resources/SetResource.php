<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SetResource extends JsonResource
{
    public function toArray($request) {
        return [
            'id' => $this->id,
            'exercise' => new ExerciseResource($this->exercise),
            'weight' => $this->weight,
            'time' => $this->time,
            'reps' => $this->reps,
            'rpe' => $this->rpe,
            'break' => $this->break,
            'order' => $this->order
        ];
    }
}
