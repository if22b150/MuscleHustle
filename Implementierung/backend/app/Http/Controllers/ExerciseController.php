<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Repositories\Interfaces\ExerciseRepositoryInterface;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function __construct(protected ExerciseRepositoryInterface $exerciseRepository)
    {}

    public function store(StoreExerciseRequest $request)
    {
        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'video_link' => $request->videoLink,
            'type' => $request->type,
            'muscle_groups' => $request->muscleGroups
        ];
        return new ExerciseResource($this->exerciseRepository->create($data));
    }

    public function index(Request $request)
    {
        return ExerciseResource::collection($this->exerciseRepository->all());
    }

    public function destroy(Request $request, int $id)
    {
        $this->exerciseRepository->delete($id);
        return response()->json([""], 204);
    }
}
