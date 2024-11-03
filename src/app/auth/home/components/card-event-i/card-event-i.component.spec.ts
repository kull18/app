import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventIComponent } from './card-event-i.component';

describe('CardEventIComponent', () => {
  let component: CardEventIComponent;
  let fixture: ComponentFixture<CardEventIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardEventIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEventIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
