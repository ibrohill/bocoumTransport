<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:user,admin,serviceClient', // Ajout de la validation pour le rôle
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, // Assigner le rôle fourni
        ]);

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user->tokens()->delete(); // Your original line
        return response()->json(['message' => 'Successfully logged out']);
    }



    public function updateProfile(Request $request) {
        \Log::info('Received profile update request:', $request->all());

        // Validation
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'nullable|string|min:8', // Assurez-vous que le mot de passe est nullable
        ]);

        // Récupérer l'utilisateur authentifié
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user->name = $validatedData['name'];

        // Mettre à jour le mot de passe uniquement s'il est fourni
        if ($request->filled('password')) {
            $user->password = Hash::make($validatedData['password']);
        }

        $user->save();

        return response()->json(['message' => 'Profil mis à jour avec succès', 'user' => $user], 200);
    }




}
