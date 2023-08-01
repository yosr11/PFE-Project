import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWaypointComponent } from './form-waypoint.component';

describe('FormWaypointComponent', () => {
  let component: FormWaypointComponent;
  let fixture: ComponentFixture<FormWaypointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWaypointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormWaypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
