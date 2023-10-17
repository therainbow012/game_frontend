import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorResultComponent } from './color-result.component';

describe('ColorResultComponent', () => {
  let component: ColorResultComponent;
  let fixture: ComponentFixture<ColorResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorResultComponent]
    });
    fixture = TestBed.createComponent(ColorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
