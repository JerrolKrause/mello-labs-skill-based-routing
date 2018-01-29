import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from "rxjs/Subscription";

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
		one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
		!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
				? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
		!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
				? false : one.day > two.day : one.month > two.month : one.year > two.year;

// https://ng-bootstrap.github.io/#/components/datepicker/examples
@Component({
		selector: 'pto-calendar',
		styles: [`
				ngb-datepicker{padding: .5rem 1rem;box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);}
				ngb-datepicker:focus{outline: 0!important;}
				.custom-day {text-align: center;padding: 0.185rem 0.25rem;display: inline-block;height: 2rem;width: 2rem;}
				.custom-day.focused {background-color: #e6e6e6;}
				.custom-day.range, .custom-day:hover {background-color: rgb(2, 117, 216);color: white; }
				.custom-day.faded {background-color: rgba(2, 117, 216, 0.5);}
  `],
		templateUrl: './pto-calendar.component.html'
})
export class PtoCalendarComponent implements OnInit {


		public hoveredDate: NgbDateStruct;
		public fromDate: NgbDateStruct;
		public toDate: NgbDateStruct;

		@Input() ruleGroup;

		@Output() onRuleDelete: EventEmitter<any> = new EventEmitter;

		private subs: Subscription[] = [];

		constructor(
				private fb: FormBuilder,
				calendar: NgbCalendar
		) {
				this.fromDate = calendar.getToday();
				//this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
		}

		public ngOnInit() {
			

		}

		onDateChange(date: NgbDateStruct) {
				if (!this.fromDate && !this.toDate) {
						this.fromDate = date;
				} else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
						this.toDate = date;
				} else {
						this.toDate = null;
						this.fromDate = date;
				}
		}

		isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
		isInside = date => after(date, this.fromDate) && before(date, this.toDate);
		isFrom = date => equals(date, this.fromDate);
		isTo = date => equals(date, this.toDate);

}
