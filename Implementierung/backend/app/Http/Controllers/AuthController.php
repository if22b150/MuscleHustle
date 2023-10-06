<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct(protected UserRepositoryInterface $userRepository) {}

    public function login(LoginRequest $request)
    {
        $email = $request->email;
        $password = $request->password;
        $token = $request->bearerToken();

        $user = $this->userRepository->getFirstWhere('email', $email);

        if(!$user)
            return response()->json(['User not found.'], 422);

        if (!Hash::check($password, $user->password))
            return response()->json(['Credentials incorrect'], 401);

        if ($token && (!auth('sanctum')->check() || auth('sanctum')->user()->id != $user->id))
            return response()->json(['Token invalid'], 401);

        return new UserResource($user, $token);
    }
}
