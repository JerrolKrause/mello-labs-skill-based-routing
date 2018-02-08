import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriorityComponent } from './product-priority.component';

describe('ProductPriorityComponent', () => {
  let component: ProductPriorityComponent;
  let fixture: ComponentFixture<ProductPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
