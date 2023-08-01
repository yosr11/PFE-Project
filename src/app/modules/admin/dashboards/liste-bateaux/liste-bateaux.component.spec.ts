import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeBateauxComponent } from './liste-bateaux.component';

describe('ListeBateauxComponent', () => {
  let component: ListeBateauxComponent;
  let fixture: ComponentFixture<ListeBateauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeBateauxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeBateauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
