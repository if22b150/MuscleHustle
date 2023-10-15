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
}
