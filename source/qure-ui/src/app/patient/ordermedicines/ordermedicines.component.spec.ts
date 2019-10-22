import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermedicinesComponent } from './ordermedicines.component';

describe('OrdermedicinesComponent', () => {
  let component: OrdermedicinesComponent;
  let fixture: ComponentFixture<OrdermedicinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdermedicinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdermedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
