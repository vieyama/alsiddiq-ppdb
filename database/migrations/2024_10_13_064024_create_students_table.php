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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->string('dob');
            $table->string('familiy_status');
            $table->string('fullname');
            $table->string('gender');
            $table->string('grade');
            $table->string('level');
            $table->string('nik')->unique();
            $table->string('nis')->unique();
            $table->string('nisn')->unique();
            $table->string('phone');
            $table->string('pob');
            $table->string('religion');
            $table->foreignId('user_id')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
