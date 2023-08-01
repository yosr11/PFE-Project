import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGeofenceComponent } from './error-geofence.component';

describe('ErrorGeofenceComponent', () => {
  let component: ErrorGeofenceComponent;
  let fixture: ComponentFixture<ErrorGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorGeofenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
