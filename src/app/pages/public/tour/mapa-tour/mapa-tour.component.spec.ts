import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaTourComponent } from './mapa-tour.component';

describe('MapaTourComponent', () => {
  let component: MapaTourComponent;
  let fixture: ComponentFixture<MapaTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaTourComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
