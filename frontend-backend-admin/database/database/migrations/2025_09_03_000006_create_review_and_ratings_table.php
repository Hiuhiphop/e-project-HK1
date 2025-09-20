<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('review_and_ratings', function (Blueprint $table) {
            $table->id('review_id');
            $table->unsignedBigInteger('appointment_id')->nullable();
            $table->integer('rating_score'); // validation sẽ xử lý ở Laravel
            $table->text('review_text')->nullable();
            $table->timestamp('review_date')->useCurrent();

            $table->foreign('appointment_id')
                  ->references('appointment_id')
                  ->on('appointments')
                  ->onDelete('set null');
        });
    }
    public function down(): void {
        Schema::dropIfExists('review_and_ratings');
    }
};
