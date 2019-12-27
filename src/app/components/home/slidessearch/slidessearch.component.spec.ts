import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidessearchComponent } from './slidessearch.component';

describe('SlidessearchComponent', () => {
  let component: SlidessearchComponent;
  let fixture: ComponentFixture<SlidessearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidessearchComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidessearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
