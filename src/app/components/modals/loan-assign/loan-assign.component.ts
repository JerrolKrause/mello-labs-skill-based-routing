import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { ApiService } from '@api';

@Component({
	selector: 'app-loan-assign',
	templateUrl: './loan-assign.component.html',
	styleUrls: ['./loan-assign.component.scss']
})
export class LoanAssignModalComponent implements OnInit {
	public formMain: FormGroup;
	public users: any[];
	public usersAll: any[];

	public data: any; // Data is actually passed through the modal service not here
	public dataAlt: any; // Data is actually passed through the modal service not here
	public onSuccess: EventEmitter<any> = new EventEmitter();

	public subs: any[] = [];

	constructor(
		public activeModal: NgbActiveModal,
		private api: ApiService,
		private fb: FormBuilder
	) { }

	ngOnInit() {

		// Formgroup
		this.formMain = this.fb.group({
			usersAll: ['', []],
		});

		// Get users and load into store
		this.api.users.get().subscribe();

		this.subs = [
			// User Data
			this.api.users$.subscribe(users => {
				if (users) {
					let total = Math.floor(Math.random() * 15) + 1;
					this.users = users.src.filter((user, i) => i < total);
					this.usersAll = users.src;
				}
			})
		];

	}

	/**
		* Submit the form
		*/
	submit() {
		this.activeModal.close('Success');
	}//end submit

}
