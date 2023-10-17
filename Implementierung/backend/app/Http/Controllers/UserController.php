<?php

namespace App\Http\Controllers;

use App\Enums\ERole;
use App\Http\Requests\StoreClientRequest;
use App\Http\Resources\ClientResource;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct(protected UserRepositoryInterface $userRepository)
    {
    }

    public function index(Request $request)
    {
        return ClientResource::collection($this->userRepository->getWhere('coach_user_id', $request->user()->id));
    }

    public function store(StoreClientRequest $request)
    {
        $data = [
            "firstname" => $request->firstname,
            "lastname" => $request->lastname,
            "phone" => $request->phone,
            "email" => $request->email,
            "gender" => $request->gender,
            "role" => ERole::CLIENT,
            "password" => $request->password,
            "coach_user_id" => $request->user()->id
        ];
        return new ClientResource($this->userRepository->create($data, true));
    }

    public function destroy(int $id)
    {
        $user = $this->userRepository->get($id);

        if ($user) {
            // Delete the user using the repository's delete method
            if ($this->userRepository->delete($id)) {
                return response()->json(['message' => 'User deleted successfully']);
            } else {
                return response()->json(['message' => 'User could not be deleted'], 500);
            }
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }
}
