import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayClipartComponent } from './display-clipart.component';

describe('DisplayClipartComponent', () => {
  let component: DisplayClipartComponent;
  let fixture: ComponentFixture<DisplayClipartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayClipartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayClipartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
