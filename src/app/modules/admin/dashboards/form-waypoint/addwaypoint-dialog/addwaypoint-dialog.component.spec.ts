import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwaypointDialogComponent } from './addwaypoint-dialog.component';

describe('AddwaypointDialogComponent', () => {
  let component: AddwaypointDialogComponent;
  let fixture: ComponentFixture<AddwaypointDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddwaypointDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddwaypointDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
