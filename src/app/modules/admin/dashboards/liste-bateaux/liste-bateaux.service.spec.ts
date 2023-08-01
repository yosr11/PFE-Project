import { TestBed } from '@angular/core/testing';

import { ListeBateauxService } from './liste-bateaux.service';

describe('ListeBateauxService', () => {
  let service: ListeBateauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeBateauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
