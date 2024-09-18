import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

import { Notyf } from 'notyf';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent {
  profileForm: FormGroup;
  private notyf = new Notyf();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public activeModal: NgbActiveModal
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
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
      this.authService.updateProfile(name, password).subscribe(
        () => {
          this.notyf.success('Profil mis à jour avec succès !');
          this.activeModal.close();
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
