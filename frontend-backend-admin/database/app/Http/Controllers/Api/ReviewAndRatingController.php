<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ReviewAndRating;
use Illuminate\Http\Request;
class ReviewAndRatingController extends Controller
{
    public function index()
    {
        return ReviewAndRating::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'appointment_id' => 'nullable|exists:appointments,appointment_id',
            'rating_score' => 'required|integer|min:1|max:5',
        ]);

        $review = ReviewAndRating::create($request->all());
        return response()->json($review, 201);
    }

    public function show($id)
    {
        return ReviewAndRating::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $review = ReviewAndRating::findOrFail($id);
        $review->update($request->all());
        return response()->json($review, 200);
    }

    public function destroy($id)
    {
        $review = ReviewAndRating::findOrFail($id);
        $review->delete();
        return response()->json(null, 204);
    }
}
