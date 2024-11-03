import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventPastComponent } from './card-event-past.component';

describe('CardEventPastComponent', () => {
  let component: CardEventPastComponent;
  let fixture: ComponentFixture<CardEventPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEventPastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEventPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
