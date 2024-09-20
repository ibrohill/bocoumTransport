<?php

namespace App\Http\Controllers;

use App\Models\Voyage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Chaise;


class VoyageController extends Controller
{
    // Affiche tous les voyages
    public function index()
    {
        return Voyage::all();
    }

    // Crée un nouveau voyage
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'depart' => 'required|string|max:255',
            'arrivee' => 'required|string|max:255',
            'date' => 'required|date',

        ]);

        $voyage = Voyage::create($validatedData);

        return response()->json($voyage, 201);
    }

    // Affiche les détails d'un voyage
    public function show($id)
    {
        $voyage = Voyage::with('bus')->findOrFail($id);

        if ($voyage) {
            Log::info('Bus associé:', ['bus' => $voyage->bus]);
            return response()->json($voyage);
        } else {
            return response()->json(['message' => 'Voyage non trouvé'], 404);
        }
    }



    public function update(Request $request, $id)
    {
        $voyage = Voyage::find($id);
        if ($voyage) {
            $voyage->update($request->all());
            return response()->json($voyage);
        } else {
            return response()->json(['message' => 'Voyage non trouvé'], 404);
        }
    }

    // Supprime un voyage
    public function destroy($id)
    {
        $voyage = Voyage::find($id);
        if ($voyage) {
            $voyage->delete();
            return response()->json(['message' => 'Voyage supprimé']);
        } else {
            return response()->json(['message' => 'Voyage non trouvé'], 404);
        }
    }


    public function rechercher(Request $request)
    {
        $request->validate([
            'depart' => 'required|string|max:255',
            'arrivee' => 'required|string|max:255',
            'date' => 'required|date',
            'heure' => 'heure|time',
        ]);

        $voyages = Voyage::where('depart', $request->input('depart'))
                         ->where('arrivee', $request->input('arrivee'))
                         ->whereDate('date', $request->input('date'))
                         ->get();

        if ($voyages->isEmpty()) {
            return response()->json(['message' => 'Aucun voyage trouvé pour les critères spécifiés'], 404);
        }

        return response()->json($voyages);
    }
    public function cancel($id)
    {
        $voyage = Voyage::find($id);
        if (!$voyage) {
            return response()->json(['message' => 'Voyage non trouvé'], 404);
        }

        // Logique pour annuler le voyage
        $voyage->status = 'Annulé';
        $voyage->save();

        return response()->json(['message' => 'Voyage annulé avec succès']);
    }

    public function updateStatus(Request $request, $id)
    {
        $voyage = Voyage::findOrFail($id);
        $voyage->status = $request->input('status');
        $voyage->save();

        return response()->json(['message' => 'Statut mis à jour avec succès']);
    }

    public function getChaises($voyageId) {
        // Get the voyage
        $voyage = Voyage::find($voyageId);

        if (!$voyage) {
            return response()->json(['error' => 'Voyage not found'], 404);
        }

        // Get the bus assigned to this voyage
        $bus = $voyage->bus;

        if (!$bus) {
            return response()->json(['error' => 'Bus not assigned to this voyage'], 404);
        }

        // Get the chairs for the bus and voyage
        $chaises = Chaise::where('bus_id', $bus->id)
            ->where('voyage_id', $voyageId)
            ->get();

        return response()->json($chaises);
    }

    public function getChaisesDisponibles($voyageId)
    {
        Log::info("Tentative de récupération des chaises pour le voyage ID: {$voyageId}");

        $voyage = Voyage::with(['bus.chaises'])
            ->where('id', $voyageId)
            ->where('status', '!=', 'Annulé')
            ->first();

        if (!$voyage) {
            Log::warning("Voyage non trouvé ou annulé. ID: {$voyageId}");
            return response()->json(['message' => 'Voyage non disponible ou annulé.'], 404);
        }

        Log::info("Voyage trouvé: ", $voyage->toArray());

        $chaisesDisponibles = $voyage->bus->chaises->filter(function ($chaise) {
            return $chaise->disponible;
        });

        Log::info("Nombre de chaises disponibles trouvées: " . $chaisesDisponibles->count());

        if ($chaisesDisponibles->isEmpty()) {
            Log::warning("Aucune chaise disponible trouvée pour le voyage ID: {$voyageId}");
            return response()->json(['message' => 'Aucune chaise disponible trouvée.'], 404);
        }

        Log::info("Détails des chaises disponibles: ", $chaisesDisponibles->toArray());

        return response()->json($chaisesDisponibles);
    }

}
