<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExerciseResource extends JsonResource
{
    public function toArray($request) {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'description' => $this->description,
            'videoLink' => $this->video_link,
            'muscleGroups' => MuscleGroupResource::collection($this->muscleGroups)
        ];
    }
}
