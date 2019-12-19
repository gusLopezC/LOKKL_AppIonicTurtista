import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionPage } from './facturacion.page';

describe('FacturacionPage', () => {
  let component: FacturacionPage;
  let fixture: ComponentFixture<FacturacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
