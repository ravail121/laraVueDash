<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminCreds extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        User::insert([
            'name' =>'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }

}
