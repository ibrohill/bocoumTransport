import { Component, OnInit } from '@angular/core';
import { EmbarquementService } from '../services/embarquement.service';

@Component({
  selector: 'app-embarquement-management',
  templateUrl: './embarquement-management.component.html',
  styleUrls: ['./embarquement-management.component.css']
})
export class EmbarquementManagementComponent implements OnInit {

  embarquements: any[] = [];
  newEmbarquement: any = {};

  constructor(private embarquementService: EmbarquementService) { }

  ngOnInit(): void {
    this.loadEmbarquements();
  }

  loadEmbarquements(): void {
    this.embarquementService.getAllEmbarquements().subscribe(data => {
      this.embarquements = data;
    });
  }

  addEmbarquement(): void {
    this.embarquementService.createEmbarquement(this.newEmbarquement).subscribe(() => {
      this.loadEmbarquements();
      this.newEmbarquement = {};
    });
  }

  deleteEmbarquement(id: number): void {
    this.embarquementService.deleteEmbarquement(id).subscribe(() => {
      this.loadEmbarquements();
    });
  }

  // embarquement-management.component.ts
  editEmbarquement(embarquement: any): void {
    this.newEmbarquement = { ...embarquement };
  }

  updateEmbarquement(): void {
    this.embarquementService.updateEmbarquement(this.newEmbarquement.id, this.newEmbarquement).subscribe(() => {
      this.loadEmbarquements();
      this.newEmbarquement = {};
    });
  }

}
