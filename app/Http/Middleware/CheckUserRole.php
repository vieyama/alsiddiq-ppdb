<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated and has the 'student' role
        if (Auth::check() && Auth::user()->user_type === 'student') {
            // Redirect students to a different route, e.g., /dashboard-student
            return redirect()->route('dashboard-student');
        }

        // Proceed to the next request if the user is not a student
        return $next($request);
    }
}
