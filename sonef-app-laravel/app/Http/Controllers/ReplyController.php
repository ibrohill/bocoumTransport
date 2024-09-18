<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReplyMail;

class ReplyController extends Controller
{
    public function sendReply(Request $request)
    {
        $data = $request->only('email', 'message');

        // Envoyer la réponse par e-mail
        Mail::to($data['email'])->send(new ReplyMail($data));

        return response()->json(['message' => 'Réponse envoyée avec succès!']);
    }
}
