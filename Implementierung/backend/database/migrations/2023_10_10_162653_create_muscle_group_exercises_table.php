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
        Schema::create('muscle_group_exercises', function (Blueprint $table) {
            $table->timestamps();

            $table->primary(['exercise_id', 'muscle_group_id']);

            $table->unsignedBigInteger('exercise_id');
            $table->unsignedBigInteger('muscle_group_id');

            $table->foreign('exercise_id')->references('id')->on('exercises')->cascadeOnDelete();
            $table->foreign('muscle_group_id')->references('id')->on('muscle_groups')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('muscle_group_exercises');
    }
};
