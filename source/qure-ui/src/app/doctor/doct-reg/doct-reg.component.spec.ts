import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctRegComponent } from './doct-reg.component';

describe('DoctRegComponent', () => {
  let component: DoctRegComponent;
  let fixture: ComponentFixture<DoctRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctRegComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
