<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ScheduleController extends Controller
{
    public function __construct(protected UserRepositoryInterface $userRepository) {}

    public function index(Request $request)
    {
        return new Collection();
    }
}
