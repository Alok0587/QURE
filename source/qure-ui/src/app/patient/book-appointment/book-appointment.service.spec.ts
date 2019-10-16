import { TestBed } from '@angular/core/testing';

import { BookAppointmentService } from './book-appointment.service';

describe('BookAppointmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookAppointmentService = TestBed.get(BookAppointmentService);
    expect(service).toBeTruthy();
  });
});
