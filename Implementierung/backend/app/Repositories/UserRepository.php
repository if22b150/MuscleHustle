<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{

    public function all(array $related = null)
    {
        return User::all();
    }

    public function get($id, array $related = null)
    {
        return User::find($id);
    }

    public function getWhere($column, $value, array $related = null)
    {
        if($related)
            return User::where($column, $value)->where([$related])->get();
        return User::where($column, $value)->get();
    }

    public function getFirstWhere($column, $value, array $related = null)
    {
        return User::where($column, $value)->first();
    }

    public function create(array $data)
    {
        $user = new User([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role']
        ]);
        return $user->save() ? $user : null;
    }

    public function update(array $data) // $data => ['id' => '', 'data' => ['column' => '', 'value' => '']]
    {
        return $this->get($data['id'])->update($data['data']);
    }

    public function delete($id): bool
    {
        return User::destroy($id) == 1;
    }

    public function deleteWhere($column, $value)
    {
        return User::where($column, $value)->delete();
    }

    public function exists(int $id): bool
    {
        return User::where('id', $id)->exists();
    }
}
