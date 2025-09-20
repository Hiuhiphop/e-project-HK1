<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Customer;
use App\Models\Lawyer;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Universal login cho Admin, Customer, Lawyer
     * identifier = email (customer/lawyer) hoặc username (admin)
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $email = $request->email;
        $password = $request->password;

        // 1️⃣ Kiểm tra Admin
        $admin = Admin::where('email', $email)->first();
        if ($admin && Hash::check($password, $admin->password)) { // so sánh trực tiếp
            $token = Str::random(60); // tạm token
            return response()->json([
                'token' => $token,
                'user' => $admin,
                'role' => 'admin'
            ]);
        }

        // 2️⃣ Kiểm tra Customer
        $customer = Customer::where('email', $email)->first();
        if ($customer && Hash::check($password, $customer->password)) { // so sánh trực tiếp
            $token = Str::random(60);
            return response()->json([
                'token' => $token,
                'user' => $customer,
                'role' => 'customer'
            ]);
        }

        // 3️⃣ Kiểm tra Lawyer
        $lawyer = Lawyer::where('email', $email)->first();
        if ($lawyer && Hash::check($password, $lawyer->password)) { // so sánh trực tiếp
            $token = Str::random(60);
            return response()->json([
                'token' => $token,
                'user' => $lawyer,
                'role' => 'lawyer'
            ]);
        }

        // Nếu không tìm thấy user
        return response()->json([
            'message' => 'Đăng nhập thất bại! Sai email/username hoặc mật khẩu.'
        ], 401);
    }
}
