<?php
namespace App\Services;

use GuzzleHttp\Client;

class OpenAIService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->apiKey = env('OPENAI_API_KEY');
        $this->client = new Client([
            'base_uri' => 'https://api.openai.com/v1/',
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    public function getAIResponse($message)
    {
        try {
            $response = $this->client->post('completions', [
                'json' => [
                    'model' => 'text-davinci-003', // ou le modèle que vous utilisez
                    'prompt' => $message,
                    'max_tokens' => 50,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (\Exception $e) {
            return 'Erreur lors de la communication avec l\'API OpenAI : ' . $e->getMessage();
        }
    }
}
