import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageurFormComponent } from './voyageur-form.component';

describe('VoyageurFormComponent', () => {
  let component: VoyageurFormComponent;
  let fixture: ComponentFixture<VoyageurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageurFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyageurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
