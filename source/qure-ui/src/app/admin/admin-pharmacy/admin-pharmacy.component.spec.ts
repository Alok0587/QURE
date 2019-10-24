import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPharmacyComponent } from './admin-pharmacy.component';

describe('AdminPharmacyComponent', () => {
  let component: AdminPharmacyComponent;
  let fixture: ComponentFixture<AdminPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
