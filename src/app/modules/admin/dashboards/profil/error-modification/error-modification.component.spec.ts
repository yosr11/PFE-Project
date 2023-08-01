import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorModificationComponent } from './error-modification.component';

describe('ErrorModificationComponent', () => {
  let component: ErrorModificationComponent;
  let fixture: ComponentFixture<ErrorModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
