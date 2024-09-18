import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarquementManagementComponent } from './embarquement-management.component';

describe('EmbarquementManagementComponent', () => {
  let component: EmbarquementManagementComponent;
  let fixture: ComponentFixture<EmbarquementManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbarquementManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbarquementManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
