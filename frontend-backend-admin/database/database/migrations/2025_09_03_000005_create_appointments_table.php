<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id('appointment_id');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('lawyer_id');
            $table->date('appointment_date');
            $table->time('appointment_time');
            $table->enum('status', ['Booked', 'Confirmed', 'Cancelled'])->default('Booked');
            $table->text('reason')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('customer_id')->references('customer_id')->on('customers')->onDelete('cascade');
            $table->foreign('lawyer_id')->references('lawyer_id')->on('lawyers')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('appointments');
    }
};
