import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatLoginComponent } from './pat-login.component';

describe('PatLoginComponent', () => {
  let component: PatLoginComponent;
  let fixture: ComponentFixture<PatLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
