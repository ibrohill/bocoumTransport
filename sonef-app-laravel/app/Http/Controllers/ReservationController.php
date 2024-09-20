<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Chaise;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use App\Models\Voyage;
use App\Mail\ReservationCancelled;
use Illuminate\Support\Facades\Mail;
use App\Models\User;



class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $voyageurId = $request->query('voyageurId');

        if ($voyageurId) {
            $reservations = Reservation::where('voyageur_id', $voyageurId)
                ->with('voyage.bus')
                ->get();
        } else {
            $reservations = Reservation::with('voyage.bus')->get(); // Inclure les détails du bus
        }
        Log::info($reservations->toArray());

        return response()->json($reservations);
    }

    public function show($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($reservation);
    }

    public function store(Request $request)
    {
        try {
            Log::info($request->all()); // Pour voir les données reçues

            $validated = $request->validate([
                'voyageur_id' => 'required|exists:voyageurs,id',
                'dateReservation' => 'required|date',
                'statut' => 'required|string',
                'montantTotal' => 'required|numeric',
                'depart' => 'required|string',
                'arrivee' => 'required|string',
                'heure' => 'required|date_format:H:i:s',
                'nombrePersonnes' => 'required|integer|min:1',
                'prix' => 'required|numeric',
                'chaisesSelectionnees' => 'required|array',
                'chaisesSelectionnees.*' => 'integer|exists:chaises,id',
            ]);

            // Traitement des chaises sélectionnées
            $chaisesSelectionnees = $request->input('chaisesSelectionnees');
            foreach ($chaisesSelectionnees as $chaiseId) {
                $chaise = Chaise::find($chaiseId);
                if ($chaise) {
                    $chaise->reservee = true;
                    $chaise->disponible = false;
                    $chaise->save();
                }
            }

            Log::info('Tentative de création de réservation');
            $reservation = Reservation::create($validated);
            Log::info('Réservation créée', ['reservation' => $reservation]);

//            return response()->json($reservation, 201);
            return response()->json(['id' => $reservation->id], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Erreur de validation', ['errors' => $e->validator->errors()]);
            return response()->json(['errors' => $e->validator->errors()], 422);
        }
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'voyageur_id' => 'required|exists:voyageurs,id',
            'dateReservation' => 'required|date',
            'statut' => 'required|string',
            'montantTotal' => 'required|numeric|min:0',
            'nombrePersonnes' => 'required|integer|min:1',
            'prix' => 'required|numeric|min:0',
            'depart' => 'required|string',
            'arrivee' => 'required|string',
            'heure' => 'required|date_format:H:i',
            'chaisesSelectionnees' => 'nullable|array',
            'chaisesSelectionnees.*' => 'integer|exists:chaises,id'
        ]);

        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $reservation->update($validatedData);

        return response()->json($reservation);
    }

    public function destroy($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], Response::HTTP_NOT_FOUND);
        }

        $reservation->delete();

        return response()->json(['message' => 'Réservation supprimée']);
    }

    public function getReservations()
    {
        $reservations = Reservation::with('voyage.bus')->get();
        return response()->json($reservations);
    }

    public function getReservationsByVoyageur($voyageurId)
    {
        $reservations = Reservation::where('voyageur_id', $voyageurId)->get();

        if ($reservations->isEmpty()) {
            return response()->json(['message' => 'Aucune réservation trouvée pour ce voyageur.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($reservations);
    }

    public function acceptReservation($id)
    {
        $reservation = Reservation::find($id);
        if ($reservation) {
            $reservation->status = 'Acceptée';
            $reservation->save();
            return response()->json(['message' => 'Réservation acceptée avec succès.']);
        }
        return response()->json(['message' => 'Réservation non trouvée.'], 404);
    }

    public function refuseReservation($id)
    {
        $reservation = Reservation::find($id);
        if ($reservation) {
            $reservation->status = 'Refusée';
            $reservation->save();
            return response()->json(['message' => 'Réservation refusée avec succès.']);
        }
        return response()->json(['message' => 'Réservation non trouvée.'], 404);
    }

    public function getChaisesDisponibles($voyageId)
    {
        // Log de l'ID du voyage pour le suivi
        Log::info("Tentative de récupération des chaises pour le voyage ID: {$voyageId}");

        // Récupération du voyage avec les chaises du bus associé
        $voyage = Voyage::with(['bus.chaises'])
            ->where('id', $voyageId)
            ->where('status', '!=', 'Annulé')
            ->first();

        // Vérifier si le voyage a été trouvé
        if (!$voyage) {
            Log::warning("Voyage non trouvé ou annulé. ID: {$voyageId}");
            return response()->json(['message' => 'Voyage non disponible ou annulé.'], 404);
        }

        // Log des informations du voyage
        Log::info("Voyage trouvé: ", $voyage->toArray());

        // Filtrer les chaises disponibles
        $chaisesDisponibles = $voyage->bus->chaises->filter(function ($chaise) {
            return $chaise->disponible;
        });

        // Log du nombre de chaises disponibles
        Log::info("Nombre de chaises disponibles trouvées: " . $chaisesDisponibles->count());

        // Vérifier si des chaises sont disponibles
        if ($chaisesDisponibles->isEmpty()) {
            Log::warning("Aucune chaise disponible trouvée pour le voyage ID: {$voyageId}");
            return response()->json(['message' => 'Aucune chaise disponible trouvée.'], 404);
        }

        // Log des détails des chaises disponibles
        Log::info("Détails des chaises disponibles: ", $chaisesDisponibles->toArray());

        return response()->json($chaisesDisponibles);
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





    public function cancelReservation($reservationId)
    {
        try {
            $reservation = Reservation::findOrFail($reservationId); // Utilisez findOrFail pour gérer l'absence de réservation

            $user = User::find($reservation->user_id);

            if ($user) {
                $reservation->statut = 'annulée';
                $reservation->save();

                $user->notify(new ReservationCancelled());
                return response()->json(['message' => 'Réservation annulée avec succès.'], 200);
            } else {
                return response()->json(['error' => 'Utilisateur non trouvé.'], 404);
            }
        } catch (\Exception $e) {
            // Log l'erreur pour des détails plus précis
            \Log::error($e->getMessage());
            return response()->json(['error' => 'Erreur interne du serveur.'], 500);
        }
    }


}
