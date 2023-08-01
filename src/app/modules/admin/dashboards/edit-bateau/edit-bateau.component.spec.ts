import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBateauComponent } from './edit-bateau.component';

describe('EditBateauComponent', () => {
  let component: EditBateauComponent;
  let fixture: ComponentFixture<EditBateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBateauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
