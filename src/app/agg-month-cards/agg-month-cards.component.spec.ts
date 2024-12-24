import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggMonthCardsComponent } from './agg-month-cards.component';

describe('AggMonthCardsComponent', () => {
  let component: AggMonthCardsComponent;
  let fixture: ComponentFixture<AggMonthCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggMonthCardsComponent]
    });
    fixture = TestBed.createComponent(AggMonthCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
