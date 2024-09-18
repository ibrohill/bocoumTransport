<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class PaytechService
{
    protected $client;
    protected $apiKey;
    protected $apiSecret;
    protected $isLive;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('PAYTECH_API_KEY');
        $this->apiSecret = env('PAYTECH_API_SECRET');
        $this->isLive = env('PAYTECH_LIVE_MODE');
    }

    public function createPayment($amount, $orderId)
    {
        $url = $this->isLive ? 'https://api.paytech.com/v1/payments' : 'https://sandbox.api.paytech.com/v1/payments';

        try {
            $response = $this->client->post($url, [
                'json' => [
                    'amount' => $amount,
                    'currency' => env('PAYTECH_CURRENCY'),
                    'order_id' => $orderId,
                    'api_key' => $this->apiKey,
                    // Ajoutez d'autres paramètres nécessaires ici
                ],
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiSecret,
                    'Accept' => 'application/json',
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création du paiement: ' . $e->getMessage());
            return null;
        }
    }

    // Ajoutez d'autres méthodes pour gérer les paiements si nécessaire
}
