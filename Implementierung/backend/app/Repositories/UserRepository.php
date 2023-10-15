<?php

namespace App\Repositories;

use App\Enums\ERole;
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

    public function create(array $data, bool $withPassword = false)
    {
        $userData = [
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'phone' => $data['phone'],
            'email' => $data['email'],
            'gender' => $data['gender'],
            'role' => $data['role']
        ];
        if($withPassword)
            $userData['password'] = Hash::make($data['password']);
        if($data['role'] == ERole::CLIENT)
            $userData['coach_user_id'] = $data['coach_user_id'];

        $user = new User($userData);

        // Just for clients
        $user->markEmailAsVerified();

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
