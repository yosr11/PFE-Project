import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointErrorComponent } from './waypoint-error.component';

describe('WaypointErrorComponent', () => {
  let component: WaypointErrorComponent;
  let fixture: ComponentFixture<WaypointErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaypointErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaypointErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
