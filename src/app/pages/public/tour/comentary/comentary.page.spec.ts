import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentaryPage } from './comentary.page';

describe('ComentaryPage', () => {
  let component: ComentaryPage;
  let fixture: ComponentFixture<ComentaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
