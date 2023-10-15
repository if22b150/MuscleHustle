<?php

namespace App\Http\Requests;

use App\Enums\EGender;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'gender' => ['required', new Enum(EGender::class)],
            'phone' => ['required', 'string'],
            'email' => ['required', 'string', 'email:rfc,dns', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6']
        ];
    }
}
