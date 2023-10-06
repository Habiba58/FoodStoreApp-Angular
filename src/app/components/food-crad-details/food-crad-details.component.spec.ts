import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCradDetailsComponent } from './food-crad-details.component';

describe('FoodCradDetailsComponent', () => {
  let component: FoodCradDetailsComponent;
  let fixture: ComponentFixture<FoodCradDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodCradDetailsComponent]
    });
    fixture = TestBed.createComponent(FoodCradDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
