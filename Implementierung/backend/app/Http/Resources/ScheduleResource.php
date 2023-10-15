<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    public function toArray($request) {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'coach' => new UserResource($this->coach),
            'client' => new UserResource($this->client),
            'visible' => $this->visible,
//            'sets' => SetResource::collection($this->sets),
            'exercises' => $this->getExercises()
        ];
    }
}
