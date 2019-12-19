import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTourPage } from './search-tour.page';

describe('SearchTourPage', () => {
  let component: SearchTourPage;
  let fixture: ComponentFixture<SearchTourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTourPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
