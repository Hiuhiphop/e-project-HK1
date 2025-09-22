<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('lawyers', function (Blueprint $table) {
            $table->id('lawyer_id');
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('phone_number', 20)->nullable();
            $table->unsignedBigInteger('specialization_id')->nullable();
            $table->integer('experience_years')->nullable();
            $table->string('address')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('province', 100)->nullable();
            $table->timestamp('registration_date')->useCurrent();

            $table->foreign('specialization_id')
                  ->references('specialization_id')
                  ->on('specializations')
                  ->onDelete('set null');
        });
    }
    public function down(): void {
        Schema::dropIfExists('lawyers');
    }
};
