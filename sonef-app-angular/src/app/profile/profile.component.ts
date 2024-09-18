import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { ProfileModalComponent } from '../profile-modal/profile-modal.component';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  private notyf = new Notyf();

  constructor(private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.user = user;
      },
      error => {
        this.notyf.error('Erreur lors de la récupération du profil.');
        console.error('Erreur lors de la récupération du profil', error);
      }
    );
  }

  openProfileModal(): void {
    const modalRef = this.modalService.open(ProfileModalComponent);
    modalRef.componentInstance.user = this.user;
  }
}
