<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Specialization;
use Illuminate\Http\Request;

class SpecializationController extends Controller
{
    public function index()
    {
        return Specialization::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'specialization_name' => 'required|unique:specializations',
        ]);

        $specialization = Specialization::create($request->all());
        return response()->json($specialization, 201);
    }

    public function show($id)
    {
        return Specialization::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $specialization = Specialization::findOrFail($id);
        $specialization->update($request->all());
        return response()->json($specialization, 200);
    }

    public function destroy($id)
    {
        $specialization = Specialization::findOrFail($id);
        $specialization->delete();
        return response()->json(null, 204);
    }
}
