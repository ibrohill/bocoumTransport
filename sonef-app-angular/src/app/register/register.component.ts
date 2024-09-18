import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private notyf = new Notyf();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['user', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Code à exécuter lors de l'initialisation du composant
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return; // Ne rien faire si le formulaire est invalide
    }

  //   const { name, email, password, role } = this.registerForm.value;
  //
  //   this.authService.register(name, email, password, role).subscribe(
  //     response => {
  //       // Afficher une notification de succès
  //       this.notyf.success('Inscription réussie ! Vous allez être redirigé vers la page de recherche.');
  //
  //       // Rediriger vers la page de recherche après 2 secondes
  //       setTimeout(() => {
  //         this.router.navigate(['/recherche']);
  //       }, 2000);
  //     },
  //     error => {
  //       // Afficher une notification d'erreur
  //       this.notyf.error('Erreur lors de l\'inscription. Veuillez réessayer.');
  //       console.error('Erreur lors de l\'inscription', error);
  //     }
  //   );


    const { name, email, password, role } = this.registerForm.value;

    this.authService.register(name, email, password, role).subscribe(
      response => {
        this.notyf.success('Inscription réussie ! Vous allez être redirigé vers la page de connexion.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        this.notyf.error('Erreur lors de l\'inscription. Veuillez réessayer.');
        console.error('Erreur lors de l\'inscription', error);
        if (error.error && error.error.errors) {
          console.error('Détails de l\'erreur:', error.error.errors);
        }
      }

    );

  }
}
