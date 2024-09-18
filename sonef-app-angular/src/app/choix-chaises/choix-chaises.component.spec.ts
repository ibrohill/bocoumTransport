import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixChaisesComponent } from './choix-chaises.component';

describe('ChoixChaisesComponent', () => {
  let component: ChoixChaisesComponent;
  let fixture: ComponentFixture<ChoixChaisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixChaisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixChaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
