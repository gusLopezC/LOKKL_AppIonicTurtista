import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourdetallesPage } from './tourdetalles.page';

describe('TourdetallesPage', () => {
  let component: TourdetallesPage;
  let fixture: ComponentFixture<TourdetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourdetallesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourdetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
