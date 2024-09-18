<?php

namespace App\Http\Controllers;

use App\Models\ServiceClient;
use Illuminate\Http\Request;

class ServiceClientController extends Controller
{
    public function index()
    {
        $requests = ServiceClient::all();
        return response()->json($requests);
    }

    /**
     * Stocke une nouvelle demande de service client.
     */
    public function store(Request $request)
    {
        // Valider les données
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Créer une nouvelle demande de service client
        $serviceClientRequest = ServiceClient::create($validatedData);

        return response()->json($serviceClientRequest, 201);
    }

    /**
     * Affiche une demande de service client spécifique.
     */
    public function show($id)
    {
        $serviceClientRequest = ServiceClient::find($id);

        if (!$serviceClientRequest) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }

        return response()->json($serviceClientRequest);
    }

    /**
     * Met à jour une demande de service client spécifique.
     */
    public function update(Request $request, $id)
    {
        // Valider les données
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255',
            'subject' => 'sometimes|required|string|max:255',
            'message' => 'sometimes|required|string',
        ]);

        // Trouver la demande à mettre à jour
        $serviceClientRequest = ServiceClient::find($id);

        if (!$serviceClientRequest) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }

        // Mettre à jour la demande avec les nouvelles données
        $serviceClientRequest->update($validatedData);

        return response()->json($serviceClientRequest);
    }

    /**
     * Supprime une demande de service client spécifique.
     */
    public function destroy($id)
    {
        $serviceClientRequest = ServiceClient::find($id);

        if (!$serviceClientRequest) {
            return response()->json(['message' => 'Demande non trouvée'], 404);
        }

        $serviceClientRequest->delete();

        return response()->json(['message' => 'Demande supprimée avec succès']);
    }
}
