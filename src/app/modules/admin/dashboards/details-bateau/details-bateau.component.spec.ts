import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBateauComponent } from './details-bateau.component';

describe('DetailsBateauComponent', () => {
  let component: DetailsBateauComponent;
  let fixture: ComponentFixture<DetailsBateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsBateauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsBateauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
