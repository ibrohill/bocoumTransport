import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVoyagesComponent } from './search-voyages.component';

describe('SearchVoyagesComponent', () => {
  let component: SearchVoyagesComponent;
  let fixture: ComponentFixture<SearchVoyagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVoyagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVoyagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
