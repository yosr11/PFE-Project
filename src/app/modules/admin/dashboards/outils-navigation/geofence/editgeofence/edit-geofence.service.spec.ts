import { TestBed } from '@angular/core/testing';

import { EditGeofenceService } from './edit-geofence.service';

describe('EditGeofenceService', () => {
  let service: EditGeofenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditGeofenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
