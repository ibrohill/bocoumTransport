<?php

namespace App\Http\Controllers;

use App\Models\Embarquement;
use Illuminate\Http\Request;

class EmbarquementController extends Controller
{
    public function index()
    {
        $embarquement = Embarquement::with('voyage')->get();
        return response()->json($embarquement);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'heure' => 'required|time',
            'voyage_id' => 'required|integer|exists:voyages,id',
        ]);

        $embarquement = Embarquement::create($validatedData);

        return response()->json([
            'message' => 'Embarquement created successfully!',
            'embarquement' => $embarquement,
        ], 201);
    }

    public function show($id)
    {
        $embarquement = Embarquement::find($id);

        if (!$embarquement) {
            return response()->json(['message' => 'Embarquement not found!'], 404);
        }

        return response()->json($embarquement);
    }

    public function update(Request $request, $id)
    {
        $embarquement = Embarquement::find($id);

        if (!$embarquement) {
            return response()->json(['message' => 'Embarquement not found!'], 404);
        }

        $validatedData = $request->validate([
            'nom' => 'string|max:255',
            'heure' => 'time',
            'voyage_id' => 'integer|exists:voyages,id',
        ]);

        $embarquement->update($validatedData);

        return response()->json([
            'message' => 'Embarquement updated successfully!',
            'embarquement' => $embarquement,
        ]);
    }

    public function destroy($id)
    {
        $embarquement = Embarquement::find($id);

        if (!$embarquement) {
            return response()->json(['message' => 'Embarquement not found!'], 404);
        }

        $embarquement->delete();

        return response()->json(['message' => 'Embarquement deleted successfully!']);
    }
}
