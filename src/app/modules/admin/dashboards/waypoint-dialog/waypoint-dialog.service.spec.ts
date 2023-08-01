import { TestBed } from '@angular/core/testing';

import { WaypointDialogService } from './waypoint-dialog.service';

describe('WaypointDialogService', () => {
  let service: WaypointDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaypointDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
