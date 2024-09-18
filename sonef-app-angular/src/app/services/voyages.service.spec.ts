import { TestBed } from '@angular/core/testing';

import { VoyagesService } from './voyages.service';

describe('VoyagesService', () => {
  let service: VoyagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoyagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
