import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatRegComponent } from './pat-reg.component';

describe('PatRegComponent', () => {
  let component: PatRegComponent;
  let fixture: ComponentFixture<PatRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
