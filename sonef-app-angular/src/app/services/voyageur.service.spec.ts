import { TestBed } from '@angular/core/testing';

import { VoyageurService } from './voyageur.service';

describe('VoyageurService', () => {
  let service: VoyageurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoyageurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
