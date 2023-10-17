import { TestBed } from '@angular/core/testing';

import { NumberPredictionService } from './number-prediction.service';

describe('NumberPredictionService', () => {
  let service: NumberPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
