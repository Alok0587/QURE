import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatAppointmentComponent } from './pat-appointment.component';

describe('PatAppointmentComponent', () => {
  let component: PatAppointmentComponent;
  let fixture: ComponentFixture<PatAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
