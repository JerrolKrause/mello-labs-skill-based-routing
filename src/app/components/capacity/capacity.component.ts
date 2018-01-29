import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'capacity',
		templateUrl: './capacity.component.html'
})
export class CapacityComponent implements OnInit {

		
		@Input() user;

		constructor(
    ) {
		}

		public ngOnInit() {
			
		}

}
