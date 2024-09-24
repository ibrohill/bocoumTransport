<?php

namespace App\Http\Controllers;

use App\Models\Voyageur;
use Illuminate\Http\Request;

class VoyageurController extends Controller
{
    public function index()
    {
        // Logique pour afficher la liste des voyageurs
        $voyageurs = Voyageur::all();
        return response()->json($voyageurs);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cni' => 'required|string|max:20|unique:voyageurs',
            'telephone' => 'required|string|max:20',
        ]);

        // Création du voyageur
        $voyageur = Voyageur::create($validatedData);

        // Retourner l'ID du voyageur et un message de succès
        return response()->json([
            'id' => $voyageur->id,
            'message' => 'Voyageur ajouté avec succès!'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $voyageur = Voyageur::find($id);
        if ($voyageur) {
            $validatedData = $request->validate([
                'cni' => 'sometimes|required|string|max:20|unique:voyageurs,cni,'.$id,
                'telephone' => 'sometimes|required|string|max:20',
            ]);

            $voyageur->update($validatedData);
            return response()->json($voyageur);
        } else {
            return response()->json(['message' => 'Voyageur non trouvé'], 404);
        }
    }

    public function destroy($id)
    {
        $voyageur = Voyageur::find($id);
        if ($voyageur) {
            $voyageur->delete();
            return response()->json(['message' => 'Voyageur supprimé avec succès!'], 200);
        } else {
            return response()->json(['message' => 'Voyageur non trouvé'], 404);
        }
    }
}
