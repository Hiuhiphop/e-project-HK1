<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AvailabilitySlot;
use Illuminate\Http\Request;

class AvailabilitySlotController extends Controller
{
    public function index()
    {
        return AvailabilitySlot::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'lawyer_id' => 'required|exists:lawyers,lawyer_id',
            'slot_date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        $slot = AvailabilitySlot::create($request->all());
        return response()->json($slot, 201);
    }

    public function show($id)
    {
        return AvailabilitySlot::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $slot = AvailabilitySlot::findOrFail($id);
        $slot->update($request->all());
        return response()->json($slot, 200);
    }

    public function destroy($id)
    {
        $slot = AvailabilitySlot::findOrFail($id);
        $slot->delete();
        return response()->json(null, 204);
    }
}
