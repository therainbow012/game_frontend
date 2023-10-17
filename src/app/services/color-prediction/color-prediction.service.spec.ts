import { TestBed } from '@angular/core/testing';

import { ColorPredictionService } from './color-prediction.service';

describe('ColorPredictionService', () => {
  let service: ColorPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
