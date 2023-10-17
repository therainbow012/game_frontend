import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberResultComponent } from './number-result.component';

describe('NumberResultComponent', () => {
  let component: NumberResultComponent;
  let fixture: ComponentFixture<NumberResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberResultComponent]
    });
    fixture = TestBed.createComponent(NumberResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
