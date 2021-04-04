import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartmentDetailsComponent } from './appartment-details.component';

describe('AppartmentDetailsComponent', () => {
  let component: AppartmentDetailsComponent;
  let fixture: ComponentFixture<AppartmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppartmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppartmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
