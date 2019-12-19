import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderPage } from './calender.page';

describe('CalenderPage', () => {
  let component: CalenderPage;
  let fixture: ComponentFixture<CalenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
