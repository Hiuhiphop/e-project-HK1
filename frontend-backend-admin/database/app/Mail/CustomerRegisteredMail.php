<?php

namespace App\Mail;

use App\Models\Customer;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CustomerRegisteredMail extends Mailable
{
    use Queueable, SerializesModels;

    public $customer;

    public function __construct(Customer $customer)
    {
        $this->customer = $customer;
    }

    public function build()
    {
        return $this->subject('Chào mừng bạn đến với Legal App')
                    ->html("
                        <h2>Xin chào {$this->customer->full_name}!</h2>
                        <p>Bạn đã đăng ký thành công tài khoản trên <b>Legal App</b>.</p>
                        <p>Email của bạn: {$this->customer->email}</p>
                        <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.</p>
                    ");
    }
}
