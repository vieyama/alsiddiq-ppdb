<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_prev_schools', function (Blueprint $table) {
            $table->id();
            $table->string('exam_model');
            $table->string('school_adress');
            $table->string('school_name');
            $table->string('school_npsn')->uniqid();
            $table->string('school_status');
            $table->string('year_of_graduation');
            $table->string('student_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_prev_schools');
    }
};
