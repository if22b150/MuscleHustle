<?php

namespace App\Repositories;

use App\Models\Schedule;
use App\Repositories\Interfaces\ScheduleRepositoryInterface;

class ScheduleRepository implements ScheduleRepositoryInterface
{

    public function all(array $related = null)
    {
        return Schedule::all();
    }

    public function get($id, array $related = null)
    {
        return Schedule::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return Schedule::where($column, $value)->where([$related])->get();
        return Schedule::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return Schedule::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $s = new Schedule([
            'name' => $data['name'],
            'visible' => $data['visible'],
            'client_user_id' => $data['client_user_id'],
            'coach_user_id' => $data['coach_user_id']
        ]);

        return $s->save() ? $s : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return Schedule::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        return Schedule::where($column, $value)->delete();
    }

    public function exists(int $id): bool
    {
        return Schedule::where('id', $id)->exists();
    }
}
