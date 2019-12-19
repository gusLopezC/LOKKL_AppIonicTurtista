import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginemailPage } from './loginemail.page';

describe('LoginemailPage', () => {
  let component: LoginemailPage;
  let fixture: ComponentFixture<LoginemailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginemailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
