<?php

namespace App\Repositories;

use App\Models\MuscleGroup;
use App\Repositories\Interfaces\MuscleGroupRepositoryInterface;

class MuscleGroupRepository implements MuscleGroupRepositoryInterface
{

    public function all(array $related = null)
    {
        return MuscleGroup::all();
    }

    public function get($id, array $related = null)
    {
        return MuscleGroup::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return MuscleGroup::where($column, $value)->where([$related])->get();
        return MuscleGroup::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return MuscleGroup::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $mg = new MuscleGroup([
            'name' => $data['name']
        ]);

        return $mg->save() ? $mg : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return MuscleGroup::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        return MuscleGroup::where($column, $value)->delete();
    }

    public function exists(int $id): bool
    {
        return MuscleGroup::where('id', $id)->exists();
    }
}
