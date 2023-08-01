import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeofenceComponent } from './editgeofence.component';

describe('EditgeofenceComponent', () => {
  let component: EditGeofenceComponent;
  let fixture: ComponentFixture<EditGeofenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGeofenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGeofenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
