import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";
import { ApiService, ApiProps } from '@api';
import { UIStoreService } from '@ui';

import * as _ from 'lodash';

@Component({
	selector: 'user-admin',
	styleUrls: ['./user-admin.component.scss'],
	templateUrl: './user-admin.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAdminComponent implements OnInit, OnDestroy {

	public users$ = this.api.users$;

	public userSearchTerm: string;
	public users: any[];

	public usersState$ = this.api.getState$(ApiProps.users);
	public formMain: FormGroup;
	public isEditing: boolean;
	public pods = ['EC1', 'EC2', 'EC3', 'WC1', 'WC2', 'WC3', 'WC4', 'WC5', 'WC6', 'WC7'];

	/** Hold subs for unsub */
	private subs: Subscription[] = [];

	constructor(
		private api: ApiService,
		public ui: UIStoreService,
		private fb: FormBuilder,
		private ref: ChangeDetectorRef
	) {
	}

	public ngOnInit() {

		// Get users and load into store
		this.api.users.get().subscribe();

		this.subs = [
			// User Data
			this.users$.subscribe(users => {
				if (users) {
					this.users = users.src;
				}
			})
		];

		// Formgroup
		this.formMain = this.fb.group({
			address: ['', []],
			company: ['', []],
			email: ['', []],
			id: ['', []],
			name: ['', [Validators.required]],
			phone: ['', []],
			username: ['', [Validators.required]],
			website: ['', []],
		});

	}

	/**
	 * Change pod
	 * @param value
	 */
	public podChange(value: string) {
		this.users = _.shuffle(this.users);
	}

	/**
	 * Refresh users
	 */
	public usersRefresh() {
		this.api.users.get(true).subscribe();
	}

	ngOnDestroy() {
		if (this.subs.length) { this.subs.forEach(sub => sub.unsubscribe()); } // Unsub
	}

}
