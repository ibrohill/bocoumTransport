import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchVoyagesComponent } from './search-voyages/search-voyages.component';
import { VoyagesListComponent } from './voyages-list/voyages-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AddVoyageComponent } from './add-voyage/add-voyage.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DestinationComponent } from './destination/destination.component';
import { ChoixChaisesComponent } from './choix-chaises/choix-chaises.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ServicesClientComponent } from './services-client/services-client.component';
import { AdminVoyagesComponent } from './admin-voyages/admin-voyages.component';
import { EditVoyageComponent } from './edit-voyage/edit-voyage.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { BusManagementComponent } from './bus-management/bus-management.component';
import { VoyageurFormComponent } from './voyageur-form/voyageur-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgenceComponent } from './agence/agence.component';
import { ContactComponent } from './contact/contact.component';
import { ReplyComponent } from './reply/reply.component';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ChatComponent } from './chat/chat.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ModifierReservationComponent } from './modifier-reservation/modifier-reservation.component';
import { ArretManagementComponent } from './arret-management/arret-management.component';
import { EmbarquementManagementComponent } from './embarquement-management/embarquement-management.component';
import { ArretEmbarquementManagementComponent } from './arret-embarquement-management/arret-embarquement-management.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchVoyagesComponent,
    VoyagesListComponent,
    ReservationComponent,
    AddVoyageComponent,
    SearchResultsComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    DestinationComponent,
    ChoixChaisesComponent,
    PaiementComponent,
    ServicesClientComponent,
    AdminVoyagesComponent,
    EditVoyageComponent,
    ReservationListComponent,
    BusManagementComponent,
    VoyageurFormComponent,
    ProfileComponent,
    ProfileModalComponent,
    AgenceComponent,
    ContactComponent,
    ReplyComponent,
    ChatComponent,
    ConfirmationComponent,
    ModifierReservationComponent,
    ArretManagementComponent,
    EmbarquementManagementComponent,
    ArretEmbarquementManagementComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]

})
export class AppModule {
  constructor() {
    // Configuration de Laravel Echo avec Pusher
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '4b1275599caf2eadfa64',  // Remplacez avec votre clé Pusher
      cluster: 'mt1',              // Remplacez avec votre cluster
      forceTLS: true
    });
  }
}
