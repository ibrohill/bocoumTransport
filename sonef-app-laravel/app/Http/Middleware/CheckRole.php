<?php

// app/Http/Middleware/CheckRole.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Check if the authenticated user has the required role
        if ($request->user() && $request->user()->role === $role) {
            return $next($request);
        }

        // Unauthorized response if the user does not have the required role
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
