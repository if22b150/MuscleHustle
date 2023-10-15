<?php

namespace App\Repositories;

use App\Models\Set;
use App\Repositories\Interfaces\SetRepositoryInterface;

class SetRepository implements SetRepositoryInterface
{

    public function all(array $related = null)
    {
        return Set::all();
    }

    public function get($id, array $related = null)
    {
        return Set::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return Set::where($column, $value)->where([$related])->get();
        return Set::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return Set::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $s = new Set([
            'exercise_id' => $data['exercise_id'],
            'schedule_id' => $data['schedule_id'],
            'weight' => $data['weight'],
            'time' => $data['time'],
            'reps' => $data['reps'],
            'rpe' => $data['rpe'],
            'break' => $data['break'],
            'order' => $data['order']
        ]);

        return $s->save() ? $s : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return Set::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        return Set::where($column, $value)->delete();
    }

    public function exists(int $id): bool
    {
        return Set::where('id', $id)->exists();
    }
}
