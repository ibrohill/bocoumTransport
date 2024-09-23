<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DialogflowController extends Controller
{
    public function handleWebhook(Request $request)
    {
        Log::info('Requête reçue : ', $request->all());

        // Vérifie si queryResult est présent
        if (!$request->has('queryResult')) {
            return response()->json(['fulfillmentText' => 'Données manquantes.']);
        }

        $queryResult = $request->input('queryResult');
        $intent = $queryResult['intent']['displayName'];

        Log::info('Intent détecté : ' . $intent);

        if ($intent === 'Demande d\'itinéraires') {
            $itineraires = [
                ['depart' => 'Dakar', 'arrivee' => 'Saint-Louis', 'heure' => '8:00'],
                ['depart' => 'Dakar', 'arrivee' => 'Thiès', 'heure' => '9:00'],
            ];

            $responseText = "Voici les itinéraires disponibles : \n";
            foreach ($itineraires as $itineraire) {
                $responseText .= $itineraire['depart'] . " à " . $itineraire['arrivee'] . " à " . $itineraire['heure'] . "\n";
            }

            return response()->json(['fulfillmentText' => $responseText]);
        }

        return response()->json(['fulfillmentText' => 'Je ne comprends pas cette demande.']);
    }
}
