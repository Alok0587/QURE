import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMedicineComponent } from './book-medicine.component';

describe('BookMedicineComponent', () => {
  let component: BookMedicineComponent;
  let fixture: ComponentFixture<BookMedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
