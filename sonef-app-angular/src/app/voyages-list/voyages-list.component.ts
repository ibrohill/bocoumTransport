import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-voyages-list',
  templateUrl: './voyages-list.component.html',
  styleUrls: ['./voyages-list.component.css']
})
export class VoyagesListComponent implements OnInit {
  voyages: any[] = [];
  voyagesFiltres: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // ...
  }

  reserver(id: number) {
    this.router.navigate(['/reservation', id]);
  }
}
