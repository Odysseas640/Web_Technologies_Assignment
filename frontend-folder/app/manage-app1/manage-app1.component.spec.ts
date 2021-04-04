import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApp1Component } from './manage-app1.component';

describe('ManageApp1Component', () => {
  let component: ManageApp1Component;
  let fixture: ComponentFixture<ManageApp1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageApp1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageApp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
