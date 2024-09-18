<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OpenAIService;

class ChatController extends Controller
{
    protected $openAIService;

    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    public function sendMessage(Request $request)
    {
        $message = $request->input('message');

        // Appeler le service pour obtenir une réponse
        $aiResponse = $this->openAIService->getAIResponse($message);

        return response()->json(['message' => $message, 'response' => $aiResponse]);
    }
}
