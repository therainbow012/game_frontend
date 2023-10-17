import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPredictionComponent } from './ColorPredictionComponent';

describe('ColorPredictionComponent', () => {
  let component: ColorPredictionComponent;
  let fixture: ComponentFixture<ColorPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPredictionComponent]
    });
    fixture = TestBed.createComponent(ColorPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
