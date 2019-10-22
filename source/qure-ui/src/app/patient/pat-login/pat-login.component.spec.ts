import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { patLoginComponent } from './pat-login.component';

describe('PatLoginComponent', () => {
  let component: patLoginComponent;
  let fixture: ComponentFixture<patLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [patLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(patLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
