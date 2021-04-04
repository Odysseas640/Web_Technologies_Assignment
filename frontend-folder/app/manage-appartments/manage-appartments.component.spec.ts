import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppartmentsComponent } from './manage-appartments.component';

describe('ManageAppartmentsComponent', () => {
  let component: ManageAppartmentsComponent;
  let fixture: ComponentFixture<ManageAppartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAppartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
