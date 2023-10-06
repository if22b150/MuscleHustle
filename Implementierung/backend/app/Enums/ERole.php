<?php

namespace App\Enums;

enum ERole: string {
    case ADMIN = 'admin';
    case COACH = 'coach';
    case CLIENT = 'client';
}
