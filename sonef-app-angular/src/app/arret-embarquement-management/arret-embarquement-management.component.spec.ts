import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretEmbarquementManagementComponent } from './arret-embarquement-management.component';

describe('ArretEmbarquementManagementComponent', () => {
  let component: ArretEmbarquementManagementComponent;
  let fixture: ComponentFixture<ArretEmbarquementManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArretEmbarquementManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArretEmbarquementManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
