import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketTotalComponent } from './basket-total.component';

describe('BasketTotalComponent', () => {
  let component: BasketTotalComponent;
  let fixture: ComponentFixture<BasketTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
