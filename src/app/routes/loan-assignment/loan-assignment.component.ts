import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Datagrid } from '@mello-labs/datagrid';

import { ApiService } from '@api';


@Component({
	selector: 'app-loan-assignment',
	templateUrl: './loan-assignment.component.html',
	styleUrls: ['./loan-assignment.component.scss']
})
export class LoanAssignmentComponent implements OnInit {

	public loans$ = this.api.loans$;
	// Inputs
	public options: Datagrid.Options = {
		scrollbarH: true,
		selectionType: false,
		heightMax: 500,
		fullScreen: false,
		controlsDropdown: true,
		showInfo: true
	}

	public state = {};

	public columns: Datagrid.Column[] = [
		{
			prop: 'lnkey',
			label: 'Loan Number',
			columnType: 'string',
			canSort: true,
			canGroup: true,
			canFilter: true
		}, {
			prop: 'type',
			label: 'Type',
			columnType: 'string',
			canSort: true,
			canGroup: true,
			canFilter: true
		},
		{
			prop: 'mi',
			label: 'MI',
			columnType: 'string',
			canSort: true,
			canGroup: true,
			canFilter: true
		}
	]


	public dateStart;
	public dateEnd;

	constructor(
		private api: ApiService,
		calendar: NgbCalendar
	) {
		this.dateStart = calendar.getToday()
		this.dateEnd = calendar.getToday()
	}

	ngOnInit() {

		this.api.loans.get().subscribe();

	}

}
