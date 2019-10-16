import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctLoginComponent } from './doct-login.component';

describe('DoctLoginComponent', () => {
  let component: DoctLoginComponent;
  let fixture: ComponentFixture<DoctLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
