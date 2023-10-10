<?php

namespace App\Repositories;

use App\Models\Exercise;
use App\Repositories\Interfaces\ExerciseRepositoryInterface;

class ExerciseRepository implements ExerciseRepositoryInterface
{

    public function all(array $related = null)
    {
        return Exercise::all();
    }

    public function get($id, array $related = null)
    {
        return Exercise::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return Exercise::where($column, $value)->where([$related])->get();
        return Exercise::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return Exercise::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $exercise = new Exercise([
            'name' => $data['name'],
            'type' => $data['type'],
            'description' => $data['description'],
            'video_link' => $data['video_link']
        ]);

        if(!$exercise->save())
            return null;

        $exercise->muscleGroups()->attach($data['muscle_groups']);

        return $exercise->save() ? $exercise : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return Exercise::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        return Exercise::where($column, $value)->delete();
    }

    public function exists(int $id): bool
    {
        return Exercise::where('id', $id)->exists();
    }
}
