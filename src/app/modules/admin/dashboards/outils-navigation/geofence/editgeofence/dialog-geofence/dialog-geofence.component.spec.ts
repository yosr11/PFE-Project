import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGeofenceComponent } from './dialog-geofence.component';

describe('DialogGeofenceComponent', () => {
  let component: DialogGeofenceComponent;
  let fixture: ComponentFixture<DialogGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGeofenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
