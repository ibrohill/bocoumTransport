import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVoyageComponent } from './edit-voyage.component';

describe('EditVoyageComponent', () => {
  let component: EditVoyageComponent;
  let fixture: ComponentFixture<EditVoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVoyageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
