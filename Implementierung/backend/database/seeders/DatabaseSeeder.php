<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\EGender;
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
            'firstname' => 'Tomse',
            'lastname' => 'Zeller',
            'phone' => '06601234567',
            'gender' => EGender::MALE,
            'email' => 'if22b150@technikum-wien.at',
            'password' => Hash::make('123456'),
            'role' => ERole::COACH,
        ]);
        $user->markEmailAsVerified();
        $user->save();

        $user = new User([
            'firstname' => 'Emil',
            'lastname' => 'Auer',
            'phone' => '06601234567',
            'gender' => EGender::MALE,
            'email' => 'e.auer@itkaufmann.at',
            'password' => Hash::make('123456'),
            'role' => ERole::CLIENT,
        ]);
        $user->markEmailAsVerified();
        $user->save();
    }
}
