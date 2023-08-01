import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModificationComponent } from './success-modification.component';

describe('SuccessModificationComponent', () => {
  let component: SuccessModificationComponent;
  let fixture: ComponentFixture<SuccessModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
