<?php

namespace App\Http\Controllers;

use App\Models\Arret;
use Illuminate\Http\Request;

class ArretController extends Controller
{
    public function index()
    {
        $arrets = Arret::with('voyage')->get();  // Chargez également le voyage associé
        return response()->json($arrets);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'quarier' => 'required|string|max:255',  // Notez l'erreur de frappe ici
            'rue' => 'required|string|max:255',
            'voyage_id' => 'required|integer|exists:voyages,id',
        ]);

        $arret = Arret::create($validatedData);

        return response()->json([
            'message' => 'Arret created successfully!',
            'arret' => $arret,
        ], 201);
    }


    public function show($id)
    {
        $arret = Arret::find($id);

        if (!$arret) {
            return response()->json(['message' => 'Arret not found!'], 404);
        }

        return response()->json($arret);
    }

    public function update(Request $request, $id)
    {
        $arret = Arret::find($id);

        if (!$arret) {
            return response()->json(['message' => 'Arret not found!'], 404);
        }

        $validatedData = $request->validate([
            'quarier' => 'string|max:255',
            'rue' => 'string|max:255',
            'voyage_id' => 'integer|exists:voyages,id',
        ]);

        $arret->update($validatedData);

        return response()->json([
            'message' => 'Arret updated successfully!',
            'arret' => $arret,
        ]);
    }

    public function destroy($id)
    {
        $arret = Arret::find($id);

        if (!$arret) {
            return response()->json(['message' => 'Arret not found!'], 404);
        }

        $arret->delete();

        return response()->json(['message' => 'Arret deleted successfully!']);
    }
}
