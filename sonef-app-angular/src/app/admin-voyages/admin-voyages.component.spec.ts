import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoyagesComponent } from './admin-voyages.component';

describe('AdminVoyagesComponent', () => {
  let component: AdminVoyagesComponent;
  let fixture: ComponentFixture<AdminVoyagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVoyagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVoyagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
