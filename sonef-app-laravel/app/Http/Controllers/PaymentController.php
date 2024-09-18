<?php

namespace App\Http\Controllers;

use App\Services\PaytechService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $paytechService;

    public function __construct(PaytechService $paytechService)
    {
        $this->paytechService = $paytechService;
    }

    public function processPayment(Request $request)
    {
        $amount = $request->input('montantTotal'); // Montant total à payer
        $orderId = $request->input('voyageId'); // ID de la réservation ou du voyage

        $paymentResponse = $this->paytechService->createPayment($amount, $orderId);

        if ($paymentResponse && isset($paymentResponse['status']) && $paymentResponse['status'] == 'success') {
            // Le paiement a été traité avec succès
            return response()->json(['message' => 'Paiement réussi !', 'data' => $paymentResponse], 200);
        }

        return response()->json(['message' => 'Erreur lors du traitement du paiement.'], 500);
    }
}
