import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointComponent } from './waypoint.component';

describe('WaypointComponent', () => {
  let component: WaypointComponent;
  let fixture: ComponentFixture<WaypointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaypointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaypointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
