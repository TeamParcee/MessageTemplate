import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContactPage } from './select-contact.page';

describe('SelectContactPage', () => {
  let component: SelectContactPage;
  let fixture: ComponentFixture<SelectContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
