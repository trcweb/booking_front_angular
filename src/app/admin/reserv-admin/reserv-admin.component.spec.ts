import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservAdminComponent } from './reserv-admin.component';

describe('ReservAdminComponent', () => {
  let component: ReservAdminComponent;
  let fixture: ComponentFixture<ReservAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
