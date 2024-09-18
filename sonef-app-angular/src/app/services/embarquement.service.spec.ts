import { TestBed } from '@angular/core/testing';

import { EmbarquementService } from './embarquement.service';

describe('EmbarquementService', () => {
  let service: EmbarquementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbarquementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
