import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPredictionComponent } from './number-prediction.component';

describe('NumberPredictionComponent', () => {
  let component: NumberPredictionComponent;
  let fixture: ComponentFixture<NumberPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPredictionComponent]
    });
    fixture = TestBed.createComponent(NumberPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
