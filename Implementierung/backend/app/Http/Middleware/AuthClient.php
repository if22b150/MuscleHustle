<?php

namespace App\Http\Middleware;

use App\Enums\ERole;
use Closure;
use Illuminate\Http\Request;

class AuthClient
{
    public function __construct() {}

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $user = $request->user();

        // Only admins are allowed to access these routes
        if ($user->role != ERole::CLIENT)
            return response('Not allowed', 403);

        return $next($request);
//        return $this->authorizeSubroutes($request, $next);
    }

//    private function authorizeSubroutes(Request $request, Closure $next) {
//        $company_id = $request->route('company_id') ?? ($request->route('company') ? $request->route('company')->id : null);
//        $customer_id = $request->route('customer_id') ?? ($request->route('customer') ? $request->route('customer')->id : null);
//
//        if ($company_id && !$this->companyRepository->exists($company_id))
//            return response('Company does not exist', 400);
//
//        if ($customer_id && !$this->customerRepository->exists($customer_id))
//            return response('Customer does not exist', 400);
//
//        if ($customer_id && $company_id && !$this->customerRepository->belongsToCompany($customer_id, $company_id))
//            return response('Customer does not belong to the company', 403);
//
//        return $next($request);
//    }
}
