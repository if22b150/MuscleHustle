<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientScheduleController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\MuscleGroupController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('auth.')->middleware(['api'])->prefix('auth')->group(function() {
//    Route::post('register', [UserController::class, 'store']);
//    Route::patch('username', [UserController::class, 'checkUsername']);
//    Route::patch('email', [UserController::class, 'checkEmail']);
//    Route::get('email/verify/{id}/{hash}', [UserController::class, 'verifyEmail'])->name('verification.verify');
//    Route::post('resend-verification-email', [UserController::class, 'resendVerificationEmail'])->middleware(['auth:sanctum']);;
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware(['auth:sanctum']);
});

Route::name('coach.')->middleware(['api', 'auth:sanctum', 'auth.coach'])->prefix('coach')->group(function() {
    Route::apiResource('muscle-groups', MuscleGroupController::class)->only(['index', 'store', 'destroy']);
    Route::apiResource('exercises', ExerciseController::class)->only(['index', 'store', 'destroy']);
    Route::apiResource('schedules', ScheduleController::class)->only(['index', 'store', 'destroy']);
    Route::apiResource('clients', UserController::class)->only(['index', 'store', 'destroy']);
});

Route::name('client.')->middleware(['api', 'auth:sanctum', 'auth.client'])->prefix('client')->group(function() {
    Route::apiResource('schedules', ClientScheduleController::class)->only(['index']);
});
