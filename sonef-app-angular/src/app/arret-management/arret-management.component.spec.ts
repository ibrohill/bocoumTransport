import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretManagementComponent } from './arret-management.component';

describe('ArretManagementComponent', () => {
  let component: ArretManagementComponent;
  let fixture: ComponentFixture<ArretManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArretManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArretManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
