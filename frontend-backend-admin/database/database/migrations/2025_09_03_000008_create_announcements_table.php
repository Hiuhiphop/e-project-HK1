<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id('announcement_id');
            $table->unsignedBigInteger('admin_id');
            $table->string('title');
            $table->text('content');
            $table->timestamp('publish_date')->useCurrent();

            $table->foreign('admin_id')->references('admin_id')->on('admins')->onDelete('cascade');
        });
    }
    public function down(): void {
        Schema::dropIfExists('announcements');
    }
};
