<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('availability_slots', function (Blueprint $table) {
            $table->id('slot_id');
            $table->unsignedBigInteger('lawyer_id');
            $table->date('slot_date');
            $table->time('start_time');
            $table->time('end_time');
            $table->enum('status', ['Available', 'Booked'])->default('Available');

            $table->foreign('lawyer_id')->references('lawyer_id')->on('lawyers')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('availability_slots');
    }
};
