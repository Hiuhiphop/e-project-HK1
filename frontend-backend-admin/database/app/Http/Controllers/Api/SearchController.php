<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Lawyer;
use App\Models\Customer;
use App\Models\Appointment;
use App\Models\Announcement;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $q = $request->input('q', '');

        if (!$q || strlen($q) < 2) {
            return response()->json([
                'Lawyers' => [],
                'Customers' => [],
                'Appointments' => [],
                'Contents' => []
            ]);
        }

        // Search Lawyers
        $lawyers = Lawyer::where('full_name', 'like', "%$q%")
            ->orWhere('email', 'like', "%$q%")
            ->orWhere('phone_number', 'like', "%$q%")
            ->orWhereHas('specialization', function ($query) use ($q) {
                $query->where('specialization_name', 'like', "%$q%");
            })
            ->limit(10)->get();

        // Search Customers
        $customers = Customer::where('full_name', 'like', "%$q%")
            ->orWhere('email', 'like', "%$q%")
            ->orWhere('phone_number', 'like', "%$q%")
            ->limit(10)->get();

        // Search Appointments, join Customer & Lawyer for names
        $appointments = Appointment::with(['customer', 'lawyer'])
            ->whereHas('customer', function ($query) use ($q) {
                $query->where('full_name', 'like', "%$q%")
                      ->orWhere('email', 'like', "%$q%");
            })
            ->orWhereHas('lawyer', function ($query) use ($q) {
                $query->where('full_name', 'like', "%$q%")
                      ->orWhere('email', 'like', "%$q%");
            })
            ->orWhere('appointment_date', 'like', "%$q%")
            ->orWhere('status', 'like', "%$q%")
            ->limit(10)
            ->get();

        // Search Announcements (Contents)
        $contents = Announcement::where('title', 'like', "%$q%")
            ->orWhere('content', 'like', "%$q%")
            ->limit(10)->get();

        return response()->json([
            'Lawyers' => $lawyers,
            'Customers' => $customers,
            'Appointments' => $appointments,
            'Contents' => $contents
        ]);
    }
}