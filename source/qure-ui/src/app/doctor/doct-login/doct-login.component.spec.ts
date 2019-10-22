import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { docLoginComponent } from './doct-login.component';

describe('doctLoginComponent', () => {
  let component: docLoginComponent;
  let fixture: ComponentFixture<docLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [docLoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(docLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
