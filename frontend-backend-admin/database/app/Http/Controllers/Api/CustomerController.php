<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomerRegisteredMail;

class CustomerController extends Controller
{
    // 📌 Lấy danh sách tất cả khách hàng
    public function index()
    {
        return Customer::all();
    }

    // 📌 Đăng ký khách hàng mới
    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'password' => 'required|string|min:6',
            'address' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:20',
        ]);

        // ✅ Lưu password plain text (theo yêu cầu của bạn, thường thì nên hash)
        $customer = Customer::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => $request->password,
            'address' => $request->address,
            'phone_number' => $request->phone_number,
        ]);

        // 📧 Gửi email chào mừng
        try {
            Mail::to($customer->email)->send(new CustomerRegisteredMail($customer));
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Đăng ký thành công nhưng gửi email thất bại!',
                'customer' => $customer,
                'error' => $e->getMessage(),
            ], 201);
        }

        return response()->json([
            'message' => 'Đăng ký thành công và email đã được gửi!',
            'customer' => $customer
        ], 201);
    }

    // 📌 Xem chi tiết 1 khách hàng
    public function show($id)
    {
        return Customer::findOrFail($id);
    }

    // 📌 Cập nhật thông tin khách hàng
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->all());

        return response()->json($customer, 200);
    }

    // 📌 Xóa khách hàng
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(null, 204);
    }
}
