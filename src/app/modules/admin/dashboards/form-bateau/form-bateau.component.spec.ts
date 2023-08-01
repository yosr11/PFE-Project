import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBateauComponent } from './form-bateau.component';

describe('FormBateauComponent', () => {
  let component: FormBateauComponent;
  let fixture: ComponentFixture<FormBateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBateauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
