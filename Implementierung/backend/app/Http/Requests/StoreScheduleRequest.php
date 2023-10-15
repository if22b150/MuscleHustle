<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleRequest extends FormRequest
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
            'clientId' => ['required', 'integer', 'exists:users,id'],
            'visible' => ['required', 'boolean'],
            'sets' => ['present', 'array'],
            'sets.*.exerciseId' => ['required', 'integer', 'exists:exercises,id'],
            'sets.*.order' => ['required', 'integer', 'gte:0'],
            'sets.*.weight' => ['nullable', 'integer'],
            'sets.*.time' => ['nullable', 'integer'],
            'sets.*.reps' => ['required', 'integer', 'gte:1'],
            'sets.*.rpe' => ['required', 'integer', 'gte:1', 'lte:10'],
            'sets.*.break' => ['nullable', 'integer']
        ];
    }
}
