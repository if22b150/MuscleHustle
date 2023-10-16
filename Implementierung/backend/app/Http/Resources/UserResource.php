<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    private ?string $bearerToken;
    private ?bool $createToken;

    public function __construct($resource, ?string $bearerToken = null, ?bool $createToken = null)
    {
        parent::__construct($resource);
        $this->bearerToken = $bearerToken;
        $this->createToken = $createToken;
    }

    public function toArray($request) {
        $result = [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'email' => $this->email,
            'verified' => $this->email_verified_at != null,
            'role' => $this->role
        ];

        if($this->createToken)
            $result['token'] = $this->bearerToken ?? $this->createToken('token', [$this->role])->plainTextToken;

        return $result;
    }
}
