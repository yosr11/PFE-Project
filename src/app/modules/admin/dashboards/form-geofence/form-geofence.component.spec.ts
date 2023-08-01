import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGeofenceComponent } from './form-geofence.component';

describe('FormGeofenceComponent', () => {
  let component: FormGeofenceComponent;
  let fixture: ComponentFixture<FormGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGeofenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
