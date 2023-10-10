<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMuscleGroupRequest;
use App\Repositories\Interfaces\MuscleGroupRepositoryInterface;
use Illuminate\Http\Request;

class MuscleGroupController extends Controller
{
    public function __construct(protected MuscleGroupRepositoryInterface $muscleGroupRepository)
    {}

    public function store(StoreMuscleGroupRequest $request)
    {
        $data = [
            'name' => $request->name
        ];
        return $this->muscleGroupRepository->create($data);
    }

    public function index(Request $request)
    {
        return $this->muscleGroupRepository->all();
    }

    public function destroy(Request $request, int $id)
    {
        $this->muscleGroupRepository->delete($id);
        return response()->json([""], 204);
    }
}
