import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {voyageur} from "../models/voyageur.model";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isLoggedIn = false;
  public userRole: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        this.authService.getUser().subscribe(user => {
          this.userRole = user.role;
          this.authService.setUserRole(user.role);
        });
      }
    });
  }

  // Retourne directement le rôle de l'utilisateur
  getUserRole(): string | null {
    return this.userRole;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false; // Met à jour l'état de connexion après déconnexion
      this.router.navigate(['/recherche']); // Redirige vers la page de connexion
    }, error => {
      console.error('Erreur de déconnexion:', error); // Log d'erreur
    });
  }

    protected readonly voyageur = voyageur;
}
