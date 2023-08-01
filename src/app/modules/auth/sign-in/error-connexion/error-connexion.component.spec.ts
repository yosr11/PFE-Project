import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorConnexionComponent } from './error-connexion.component';

describe('ErrorConnexionComponent', () => {
  let component: ErrorConnexionComponent;
  let fixture: ComponentFixture<ErrorConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorConnexionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
