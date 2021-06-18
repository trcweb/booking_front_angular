import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservAgenceComponent } from './reserv-agence.component';

describe('ReservAgenceComponent', () => {
  let component: ReservAgenceComponent;
  let fixture: ComponentFixture<ReservAgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservAgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
