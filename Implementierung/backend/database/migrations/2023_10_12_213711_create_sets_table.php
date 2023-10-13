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
        Schema::create('sets', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->integer("weight")->nullable;
            $table->integer("duration")->nullable;
            $table->integer("reputations")->nullable;
            $table->integer("rpe");
            $table->integer("break");
            $table->integer("order");

            $table->unsignedBigInteger("schedule_id");
            $table->unsignedBigInteger("exercise_id");

            $table->foreign('schedule_id')->references('id')->on('schedules')->cascadeOnDelete();
            $table->foreign('exercise_id')->references('id')->on('exercises')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sets');
    }
};
