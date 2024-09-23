import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { SearchVoyagesComponent } from './search-voyages/search-voyages.component';
import { VoyagesListComponent } from './voyages-list/voyages-list.component';
import { AddVoyageComponent } from './add-voyage/add-voyage.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import {DestinationComponent} from "./destination/destination.component";
import {ChoixChaisesComponent} from "./choix-chaises/choix-chaises.component";
import { ServicesClientComponent } from './services-client/services-client.component';
import {PaiementComponent} from "./paiement/paiement.component";
import {AdminVoyagesComponent} from "./admin-voyages/admin-voyages.component";
import {EditVoyageComponent} from "./edit-voyage/edit-voyage.component";
import {ReservationListComponent} from "./reservation-list/reservation-list.component";
import {BusManagementComponent} from "./bus-management/bus-management.component";
import {VoyageurFormComponent} from "./voyageur-form/voyageur-form.component";
import {ProfileComponent} from "./profile/profile.component";
import {AgenceComponent} from "./agence/agence.component";
import {ContactComponent} from "./contact/contact.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {ReplyComponent} from "./reply/reply.component";
import {ChatComponent} from "./chat/chat.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {ModifierReservationComponent} from "./modifier-reservation/modifier-reservation.component";
import {EmbarquementManagementComponent} from "./embarquement-management/embarquement-management.component";
import {ArretManagementComponent} from "./arret-management/arret-management.component";
import {
  ArretEmbarquementManagementComponent
} from "./arret-embarquement-management/arret-embarquement-management.component";
import {ProfileEditComponent} from "./profile-edit/profile-edit.component";


const routes: Routes = [
  { path: 'recherche', component: SearchVoyagesComponent },
  { path: 'liste-voyage', component: VoyagesListComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  // { path: 'ajouter-voyage', component: AddVoyageComponent },
  { path: 'ajouter-voyage', component: AddVoyageComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'paiement', component: PaiementComponent },
  { path: 'resultatRecherche', component: SearchResultsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: NavigationComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'destination', component: DestinationComponent },
  { path: '', redirectTo: '/recherche', pathMatch: 'full' },
  { path: 'choix-chaises', component: ChoixChaisesComponent },
  { path: 'serviceClient', component: ServicesClientComponent },
  { path: 'admin', component: AdminVoyagesComponent },
  { path: 'edit-voyage/:id', component: EditVoyageComponent, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'reservation-list/:id', component: ReservationListComponent },
  { path: 'bus', component: BusManagementComponent },
  { path: 'fromVoyageur', component: VoyageurFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'agence', component: AgenceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'repondre', component: ReplyComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'modifier-reservation', component: ModifierReservationComponent },
  { path: 'arrets', component: ArretManagementComponent },
  { path: 'embarquements', component: EmbarquementManagementComponent },
  { path: 'arretEmbarquement', component: ArretEmbarquementManagementComponent },
  { path: 'profile-edit', component: ProfileEditComponent },


  { path: '**', redirectTo: '/recherche' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
