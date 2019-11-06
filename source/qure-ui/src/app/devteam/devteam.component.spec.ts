import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevteamComponent } from './devteam.component';

describe('DevteamComponent', () => {
  let component: DevteamComponent;
  let fixture: ComponentFixture<DevteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
