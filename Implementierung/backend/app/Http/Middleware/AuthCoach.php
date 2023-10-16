<?php

namespace App\Http\Middleware;

use App\Enums\ERole;
use App\Repositories\Interfaces\ScheduleRepositoryInterface;
use Closure;
use Illuminate\Http\Request;

class AuthCoach
{
    public function __construct(protected ScheduleRepositoryInterface $scheduleRepository) {}

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $user = $request->user();

        // Only admins are allowed to access these routes
        if ($user->role != ERole::COACH)
            return response('Not allowed', 403);

        return $this->authorizeSubroutes($request, $next, $user->id);
    }

    private function authorizeSubroutes(Request $request, Closure $next, int $userId) {
        $scheduleId = $request->route('scheduleId') ?? ($request->route('schedule') ? $request->route('schedule') : null);

        if ($scheduleId && !$this->scheduleRepository->exists($scheduleId))
            return response('Schedule does not exist', 404);

        if ($scheduleId && $userId && !$this->scheduleRepository->getWhere('id', $scheduleId, ["coach_user_id", $userId]))
            return response('Schedule does not belong to the user', 403);

        return $next($request);
    }
}
