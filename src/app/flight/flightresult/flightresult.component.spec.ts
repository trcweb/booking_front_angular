import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightresultComponent } from './flightresult.component';

describe('FlightresultComponent', () => {
  let component: FlightresultComponent;
  let fixture: ComponentFixture<FlightresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
