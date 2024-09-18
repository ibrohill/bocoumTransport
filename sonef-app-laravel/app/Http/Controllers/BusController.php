<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\Chaise; // Assurez-vous d'importer le modèle Chaise
use Illuminate\Http\Request;

class BusController extends Controller
{
    // Create a new bus and its corresponding chairs
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'nombre_places' => 'required|integer|min:1',
            'voyage_id' => 'required|integer|exists:voyages,id',
        ]);

        $bus = Bus::create([
            'nom' => $validatedData['nom'],
            'nombre_places' => $validatedData['nombre_places'],
            'status' => 'active',
        ]);

        for ($i = 1; $i <= $bus->nombre_places; $i++) {
            Chaise::create([
                'bus_id' => $bus->id,
                'numero' => $i,
                'disponible' => true,
                'reservee' => false,
                'voyage_id' => $validatedData['voyage_id'],
            ]);
        }

        return response()->json([
            'message' => 'Bus and chairs created successfully!',
            'bus' => $bus,
        ], 201);
    }

    // Show a single bus
    public function show($id)
    {
        $bus = Bus::find($id);

        if (!$bus) {
            return response()->json([
                'message' => 'Bus non trouvé!'
            ], 404);
        }

        return view('bus.show', compact('bus'));
    }

    // Get all buses
    public function index()
    {
        $buses = Bus::all();
        return response()->json($buses);
    }

    // Activate a bus
    public function activate($id)
    {
        $bus = Bus::findOrFail($id);
        $bus->status = 'active';
        $bus->save();

        return response()->json([
            'message' => 'Bus activé avec succès!',
            'bus' => $bus,
        ]);
    }

    // Deactivate a bus
    public function deactivate($id)
    {
        $bus = Bus::findOrFail($id);
        $bus->status = 'inactive';
        $bus->save();

        return response()->json([
            'message' => 'Bus désactivé avec succès!',
            'bus' => $bus,
        ]);
    }

    // Delete a bus
    public function destroy($id)
    {
        $bus = Bus::findOrFail($id);
        $bus->delete();

        return response()->json([
            'message' => 'Bus supprimé avec succès!',
        ]);
    }
}
