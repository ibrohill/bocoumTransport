<?php

use App\Http\Controllers\VoyageurController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\VoyageController;
use App\Http\Controllers\AdministrateurController;
use App\Http\Controllers\ServiceClientController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ArretController;
use App\Http\Controllers\EmbarquementController;
use App\Http\Controllers\DialogflowController;


// Routes accessibles uniquement par les administrateurs
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {

});

// Routes accessibles uniquement par les utilisateurs
Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
});

Route::put('/profile', [AuthController::class, 'updateProfile']);




// Routes accessibles par tout le monde
Route::apiResource('administrateurs', AdministrateurController::class);
Route::apiResource('service-clients', ServiceClientController::class);

Route::get('voyages/{id}', [VoyageController::class, 'show']);
Route::put('voyages/{id}', [VoyageController::class, 'update']);

Route::delete('voyages/{id}', [VoyageController::class, 'destroy']);
Route::patch('/voyages/{id}/cancel', [VoyageController::class, 'cancel'])->name('voyages.cancel');
Route::put('/voyages/{id}/status', [VoyageController::class, 'updateStatus']);
Route::put('/voyages/{id}/toggle-status', [VoyageController::class, 'toggleStatus']);


Route::get('rechercher', [VoyageController::class, 'rechercher']);
Route::post('/rechercher', [VoyageController::class, 'rechercher']);
Route::post('/reserver/{id}', [VoyageController::class, 'reserver']);

Route::get('/cities', [CityController::class, 'index']);
Route::apiResource('voyageurs', VoyageurController::class);
//Route::apiResource('reservations', ReservationController::class);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::get('/reservations/voyageur/{id}', [ReservationController::class, 'getReservationsByVoyageur']);
Route::get('/reservations', [ReservationController::class, 'index']);
Route::put('/reservations/{id}/accept', [ReservationController::class, 'acceptReservation']);
Route::put('/reservations/{id}/refuse', [ReservationController::class, 'refuseReservation']);
Route::put('reservations/{id}/cancel', [ReservationController::class, 'cancelReservation']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::get('/reservations/chaises-disponibles/{voyageId}', [ReservationController::class, 'getChaisesDisponibles']);
Route::get('/reservations/voyages/{id}/chaises', [ReservationController::class, 'getChaises']);

//notification
//Route::get('/notifications', [NotificationController::class, 'index']);


Route::get('voyages', [VoyageController::class, 'index']);
Route::post('voyages', [VoyageController::class, 'store']);

Route::get('voyages/{id}/chaises', [VoyageController::class, 'getChaises']);
Route::get('/voyages/chaises-disponibles/{voyageId}', [VoyageController::class, 'getChaisesDisponibles']);

Route::post('register', [AuthController::class, 'register']);
// Route::post('login', [AuthController::class, 'login']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::put('/profile', [AuthController::class, 'updateProfile']);


Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'user']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'updateProfile']);


Route::post('/paiement', [PaymentController::class, 'processPayment']);



Route::post('buses', [BusController::class, 'store']);
Route::get('buses/{id}', [BusController::class, 'show']);
Route::get('buses', [BusController::class, 'index']);
Route::put('buses/{id}/activate', [BusController::class, 'activate']);
Route::put('buses/{id}/deactivate', [BusController::class, 'deactivate']);
Route::delete('buses/{id}', [BusController::class, 'destroy']);
//Route::post('/initiate-payment', [PaiementController::class, 'initiatePayment']);


Route::post('/contact', [ContactController::class, 'sendEmail']);

Route::post('/reply', [ReplyController::class, 'sendReply']);


Route::post('send-message', [ChatController::class, 'sendMessage']);




// Routes pour les arrêts
Route::get('arrets', [ArretController::class, 'index']);
Route::post('arrets', [ArretController::class, 'store']);
Route::get('arrets/{id}', [ArretController::class, 'show']);
Route::put('arrets/{id}', [ArretController::class, 'update']);
Route::delete('arrets/{id}', [ArretController::class, 'destroy']);

// Routes pour les embarquements
Route::get('embarquements', [EmbarquementController::class, 'index']);
Route::post('embarquements', [EmbarquementController::class, 'store']);
Route::get('embarquements/{id}', [EmbarquementController::class, 'show']);
Route::put('embarquements/{id}', [EmbarquementController::class, 'update']);
Route::delete('embarquements/{id}', [EmbarquementController::class, 'destroy']);


//voyageur
Route::get('/voyageurs/user/{id}', [VoyageurController::class, 'getVoyageurByUserId']);


//chat
Route::post('/dialogflow-webhook', [DialogflowController::class, 'handleWebhook']);
