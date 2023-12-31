<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetVisibilityRequest;
use App\Http\Requests\StoreScheduleRequest;
use App\Http\Resources\ScheduleResource;
use App\Repositories\Interfaces\ScheduleRepositoryInterface;
use App\Repositories\Interfaces\SetRepositoryInterface;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function __construct(protected ScheduleRepositoryInterface $scheduleRepository,
                                protected SetRepositoryInterface $setRepository) {}

    public function index(Request $request)
    {
        return ScheduleResource::collection($this->scheduleRepository->getWhere('coach_user_id', $request->user()->id));
    }

    public function store(StoreScheduleRequest $request)
    {
        $data = [
            'name' => $request->name,
            'client_user_id' => $request->clientId,
            'coach_user_id' => $request->user()->id,
            'visible' => $request->visible
        ];
        $schedule = $this->scheduleRepository->create($data);

        foreach ($request->sets as $set) {
            $setData = [
                'exercise_id' => $set['exerciseId'],
                'order' => $set['order'],
                'weight' => $set['weight'],
                'time' => $set['time'],
                'reps' => $set['reps'],
                'rpe' => $set['rpe'],
                'break' => $set['break'],
                'schedule_id' => $schedule->id
            ];
            $this->setRepository->create($setData);
        }

        return new ScheduleResource($schedule);
    }

    public function setVisibility(SetVisibilityRequest $request, int $scheduleId)
    {
        $this->scheduleRepository->update(['id' => $scheduleId, 'data' => ['visible' => $request->boolean('visible')]]);
        return new ScheduleResource($this->scheduleRepository->get($scheduleId));
    }

    public function destroy(int $id)
    {
        $schedule = $this->scheduleRepository->get($id);

        if ($schedule) {
            // Delete the schedule using the repository's delete method
            if ($this->scheduleRepository->delete($id)) {
                return response()->json(['message' => 'Schedule deleted successfully']);
            } else {
                return response()->json(['message' => 'Schedule could not be deleted'], 500);
            }
        } else {
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }
}
