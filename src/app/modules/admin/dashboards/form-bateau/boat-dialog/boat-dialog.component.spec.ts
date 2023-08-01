import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatDialogComponent } from './boat-dialog.component';

describe('BoatDialogComponent', () => {
  let component: BoatDialogComponent;
  let fixture: ComponentFixture<BoatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
