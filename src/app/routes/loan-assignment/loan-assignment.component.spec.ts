import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAssignmentComponent } from './loan-assignment.component';

describe('LoanAssignmentComponent', () => {
  let component: LoanAssignmentComponent;
  let fixture: ComponentFixture<LoanAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
