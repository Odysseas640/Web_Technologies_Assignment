import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExchangeComponent } from './message-exchange.component';

describe('MessageExchangeComponent', () => {
  let component: MessageExchangeComponent;
  let fixture: ComponentFixture<MessageExchangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageExchangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
