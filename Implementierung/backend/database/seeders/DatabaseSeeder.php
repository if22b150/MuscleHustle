<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\ERole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = new User([
            'name' => 'Coach Emil',
            'email' => 'if22b150@technikum-wien.at',
            'password' => Hash::make('123456'),
            'role' => ERole::COACH,
        ]);
        $user->markEmailAsVerified();
        $user->save();
    }
}
