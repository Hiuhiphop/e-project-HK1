<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        return Announcement::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'admin_id' => 'required|exists:admins,admin_id',
            'title' => 'required',
            'content' => 'required',
        ]);

        $announcement = Announcement::create($request->all());
        return \response()->json($announcement, 201);
    }

    public function show($id)
    {
        return Announcement::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->update($request->all());
        return \response()->json($announcement, 200);
    }

    public function destroy($id)
    {
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();
        return \response()->json(null, 204);
    }
}
