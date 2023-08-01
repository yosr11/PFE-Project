import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatErrorComponent } from './boat-error.component';

describe('BoatErrorComponent', () => {
  let component: BoatErrorComponent;
  let fixture: ComponentFixture<BoatErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
