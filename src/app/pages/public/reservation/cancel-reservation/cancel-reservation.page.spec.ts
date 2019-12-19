import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReservationPage } from './cancel-reservation.page';

describe('CancelReservationPage', () => {
  let component: CancelReservationPage;
  let fixture: ComponentFixture<CancelReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelReservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
