<?php

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

Route::name('auth.')->middleware(['api'])->group(function() {
//    Route::post('register', [UserController::class, 'store']);
//    Route::patch('username', [UserController::class, 'checkUsername']);
//    Route::patch('email', [UserController::class, 'checkEmail']);
//    Route::get('email/verify/{id}/{hash}', [UserController::class, 'verifyEmail'])->name('verification.verify');
//    Route::post('resend-verification-email', [UserController::class, 'resendVerificationEmail'])->middleware(['auth:sanctum']);;
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
//    Route::post('logout', [UserController::class, 'logout']);
});
