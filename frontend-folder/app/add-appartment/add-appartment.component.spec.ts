import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppartmentComponent } from './add-appartment.component';

describe('AddAppartmentComponent', () => {
  let component: AddAppartmentComponent;
  let fixture: ComponentFixture<AddAppartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
