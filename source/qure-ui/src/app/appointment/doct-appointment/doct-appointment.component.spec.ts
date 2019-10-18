import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctAppointmentComponent } from './doct-appointment.component';

describe('DoctAppointmentComponent', () => {
  let component: DoctAppointmentComponent;
  let fixture: ComponentFixture<DoctAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
