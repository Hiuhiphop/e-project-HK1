<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lawyer;
use App\Models\Specialization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class LawyerController extends Controller
{
    public function index()
    {
        // Sửa lại: tên cột đúng là 'specialization_name' (không phải 'specializations_name')
        $lawyers = DB::table('lawyers')
            ->leftJoin('specializations', 'lawyers.specialization_id', '=', 'specializations.specialization_id')
            ->select(
                'lawyers.*',
                'specializations.specialization_name as specialization_name'
            )
            ->get();

        return response()->json($lawyers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required|email|unique:lawyers',
            'password' => 'required|min:6',
        ]);

        $lawyer = Lawyer::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_number' => $request->phone_number,
            'specialization_id' => $request->specialization_id,
            'experience_years' => $request->experience_years,
            'address' => $request->address,
            'city' => $request->city,
            'province' => $request->province,
        ]);

        return response()->json($lawyer, 201);
    }

    public function show($id)
    {
        $lawyer = DB::table('lawyers')
            ->leftJoin('specializations', 'lawyers.specialization_id', '=', 'specializations.specialization_id')
            ->select(
                'lawyers.*',
                'specializations.specialization_name as specialization_name'
            )
            ->where('lawyers.id', $id)
            ->first();

        if (!$lawyer) {
            return response()->json(['message' => 'Lawyer not found'], 404);
        }

        return response()->json($lawyer);
    }

    public function update(Request $request, $id)
    {
        $lawyer = Lawyer::findOrFail($id);
        $lawyer->update($request->all());
        $updatedLawyer = DB::table('lawyers')
            ->leftJoin('specializations', 'lawyers.specialization_id', '=', 'specializations.specialization_id')
            ->select(
                'lawyers.*',
                'specializations.specialization_name as specialization_name'
            )
            ->where('lawyers.id', $id)
            ->first();

        return response()->json($updatedLawyer, 200);
    }

    public function destroy($id)
    {
        $lawyer = Lawyer::findOrFail($id);
        $lawyer->delete();
        return response()->json(null, 204);
    }
}