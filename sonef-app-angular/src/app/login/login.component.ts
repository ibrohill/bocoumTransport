import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  private notyf = new Notyf();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        () => {
          this.notyf.success('Connexion réussie !');
          this.router.navigate(['/profile']); // Redirige vers la page de profil
        },
        error => {
          this.notyf.error('Erreur lors de la connexion. Veuillez vérifier vos informations et réessayer.');
          console.error('Erreur lors de la connexion', error);
        }
      );
    } else {
      this.notyf.error('Veuillez remplir tous les champs correctement.');
    }
  }

}
