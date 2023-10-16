<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Repositories\Interfaces\ScheduleRepositoryInterface;
use App\Repositories\Interfaces\SetRepositoryInterface;
use Illuminate\Http\Request;

class ClientScheduleController extends Controller
{
    public function __construct(protected ScheduleRepositoryInterface $scheduleRepository,
                                protected SetRepositoryInterface $setRepository) {}

    public function index(Request $request)
    {
        return ScheduleResource::collection($this->scheduleRepository->getWhere('client_user_id', $request->user()->id, ['visible', true]));
    }
}
