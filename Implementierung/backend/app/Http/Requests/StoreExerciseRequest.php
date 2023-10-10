<?php

namespace App\Http\Requests;

use App\Enums\EExerciseType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreExerciseRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'type' => ['required', new Enum(EExerciseType::class)],
            'videoLink' => ['nullable', 'string'],
            'description' => ['required', 'string'],
            'muscleGroups' => ['present', 'array'],
            'muscleGroups.*' => ['integer', 'exists:muscle_groups,id']
        ];
    }
}
