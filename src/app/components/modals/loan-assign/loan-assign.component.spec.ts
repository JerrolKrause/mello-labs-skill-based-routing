import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAssignModalComponent } from './loan-assign.component';

describe('LoanAssignModalComponent', () => {
  let component: LoanAssignModalComponent;
  let fixture: ComponentFixture<LoanAssignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAssignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAssignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
