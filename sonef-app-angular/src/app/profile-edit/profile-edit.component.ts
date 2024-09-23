import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;
  private notyf = new Notyf();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getUser().subscribe(user => {
      this.profileForm.patchValue({
        name: user.name
      });
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const { name, password } = this.profileForm.value;
      const payload: any = { name };

      // Ajouter le mot de passe uniquement s'il est rempli
      if (password) {
        payload.password = password;
      }

      this.authService.updateProfile(payload.name, payload.password).subscribe(
        () => {
          this.notyf.success('Profil mis à jour avec succès !');
        },
        error => {
          this.notyf.error('Erreur lors de la mise à jour du profil.');
          console.error('Erreur lors de la mise à jour du profil', error);
        }
      );
    } else {
      this.notyf.error('Veuillez remplir tous les champs correctement.');
    }
  }



}
