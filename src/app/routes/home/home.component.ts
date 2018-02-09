import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";
import { ApiService, ApiProps } from '@api';
import { UIStoreService } from '@ui';

import * as _ from 'lodash';
import { Datagrid } from '@mello-labs/datagrid';


@Component({
	selector: 'home',
	styleUrls: ['./home.component.scss'],
	templateUrl: './home.component.html',
	//encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

	public view: 'pods' | 'users' | 'products' = 'users';

	// Inputs
	public options: Datagrid.Options = {
		selectionType: false,
		fullScreen: true,
		controlsDropdown: true,
		showInfo: true
	}

	public users$ = this.api.users$;

	public rows: any[];
	public columns: Datagrid.Column[];

	public state = { "filters": [], "sorts": [], "groups": [{ "dir": "asc", "prop": "pod" }] };

	public userSearchTerm: string;
	public users: any[];

	public usersState$ = this.api.getState$(ApiProps.users);
	public formMain: FormGroup;
	public isEditing: boolean;

	public podRollup = [];

	public filterGlobal = {
		term: null,
		props: ['name', 'pod']
	};

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

		// Map pod capabilities
		this.users$.subscribe((users: any) => {
			if (users) {
				this.rows = users.src;
				let podRollup = [];
				for (let pod in users.pods) {
					if (users.pods.hasOwnProperty(pod)) {
						let podCapabilities: any = {};
						(<any[]>users.pods[pod]).forEach(user => {
							for (let rule in user.rules) {
								if (user.rules.hasOwnProperty(rule) && user.rules[rule]) {
									podCapabilities[rule] = true;
								}
							}
						});
						podCapabilities.name = pod;
						podCapabilities.pod = pod;
						podRollup.push(podCapabilities);
					}
				}
				this.podRollup = podRollup.sort((a, b) => { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
				console.log(this.podRollup);
			}
		});

		// Get users and load into store
		this.api.users.get().subscribe();

		this.api.get('/assets/mock-data/columns-users.json').subscribe((result: any[]) => {
			this.columns = result;
			this.ref.markForCheck();
		});

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

	public viewChange(view: 'pods' | 'users' | 'products', filter: boolean) {
		this.ref.detach();
		this.view = view;

		switch (view) {
			case 'users':
				this.state = { "filters": [], "sorts": [], "groups": [{ "dir": "asc", "prop": "pod" }] };
				if (filter) {
					this.state.filters = [{ prop: 'pod', operator: 'eq', value: filter }];
				}
				this.rows = this.users;
				this.api.get('/assets/mock-data/columns-users.json').subscribe((result: any[]) => {
					this.columns = result;
					this.ref.reattach();
				});
				break;
			case 'pods':
				this.state = { "filters": [], "sorts": [], "groups": [] };
				this.rows = this.podRollup;
				this.api.get('/assets/mock-data/columns-pods.json').subscribe((result: any[]) => {
					this.columns = result;
					this.ref.reattach();
				});
				break;
			case 'products':
				this.state = { "filters": [], "sorts": [{ "dir": "asc", "prop": "name" }], "groups": [] };
				this.rows = this.users;
				this.api.get('/assets/mock-data/columns-products.json').subscribe((result: any[]) => {
					this.columns = [...result];
					this.ref.reattach();
				});
				break;
		}
	}

	/**
	 * Update the global filter term
	 * @param searchTerm
	 */
	public onfilterGlobal(searchTerm: string = null) {
		this.filterGlobal = { ...this.filterGlobal, term: searchTerm };
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
