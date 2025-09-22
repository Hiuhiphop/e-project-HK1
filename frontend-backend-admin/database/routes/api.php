<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\SpecializationController;
use App\Http\Controllers\Api\LawyerController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\ReviewAndRatingController;
use App\Http\Controllers\Api\AvailabilitySlotController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\AuthController;

// Route kiểm tra user hiện tại (dùng Sanctum)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// CRUD API cho 8 bảng
Route::apiResource('admins', AdminController::class);
Route::apiResource('customers', CustomerController::class);
Route::apiResource('specializations', SpecializationController::class);
Route::apiResource('lawyers', LawyerController::class);
Route::apiResource('appointments', AppointmentController::class);
Route::apiResource('reviews', ReviewAndRatingController::class);
Route::apiResource('availability-slots', AvailabilitySlotController::class);
Route::apiResource('announcements', AnnouncementController::class);

// --- Login universal cho tất cả role (Admin / Customer / Lawyer)
Route::post('/login', [AuthController::class, 'login']);

// --- Optional: login riêng từng role nếu muốn
Route::post('/admin/login', [AuthController::class, 'loginAdmin']);
Route::post('/customer/login', [AuthController::class, 'loginCustomer']);
Route::post('/lawyer/login', [AuthController::class, 'loginLawyer']);

Route::get('/search', [App\Http\Controllers\Api\SearchController::class, 'search']);