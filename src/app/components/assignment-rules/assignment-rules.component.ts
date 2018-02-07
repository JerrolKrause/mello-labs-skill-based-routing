import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";

@Component({
		selector: 'assignment-rules',
		styleUrls: [`./assignment-rules.component.scss`],
		encapsulation: ViewEncapsulation.None,
		templateUrl: './assignment-rules.component.html'
})
export class AssignmentRulesComponent implements OnInit {

		public formMain: FormGroup;
		public selectOption = ['Yes', 'No'];
		public prod = ['Conforming', 'FHA', 'VA', 'VA Super Max', 'Jumbo Advantage', 'CQ IRRRL', 'Home Ready', 'Home Possible', '40yr I/O', 'Executive High Balance', 'Streamline (FHA)', 'Jumbo Classic/Prime'];
		public typeOption = ['Purchase', 'Refinance'];
		public loanAmt = ['$0 - $950,000', '$950,000 - $1,500,000', '$1,500,001 - $2,000,000', '$2,000,001 - $3,000,000', '0 - $453,100', '$453,101 - $679,650', '$679,651 - $1,500,000', '$1,500,001 - $3,000,000'];
		public states = ['Most States', 'Hawaii','New Mexico','Texas'];
		public special = ['No Special Assignment', 'Case Financial', 'R&R Loans', 'Kaiter Entreprises', 'Roger Quandt/NDC Files'];
		public pods = ['EC1', 'EC2', 'EC3', 'WC1', 'WC2', 'WC3', 'WC4', 'WC5', 'WC6', 'WC7'];

		@Input() user;

		@Output() onRuleDelete: EventEmitter<any> = new EventEmitter;

		private subs: Subscription[] = [];

		constructor(
				private fb: FormBuilder
    ) {
		}

		public ngOnInit() {
				// Formgroup
				this.formMain = this.fb.group({
						lead: ['Mark Hansen', []],
						pods: ['', []],
						podsAll: ['', []],
						ndc: ['', []],
						tbd: ['', []],
						tcf: ['', []],
						'203k': ['', []],
						mi: ['', []],
						loanAmt: ['', []],
						loanAmt2: ['', []],
						loanAmt3: ['', []],
						products: ['', []],
						type: ['', []],
						coop: ['', []],
						cema: ['', []],
						state: ['', []],
						special: ['', []],

						conforming: ['', []],
						fha: ['', []],
						va: ['', []],
						vaSuperMax: ['', []],
						jumbo: ['', []],
						cq: ['', []],
						homeReady: ['', []],
						homePossible: ['', []],
						'40yr': ['', []],
						executive: ['', []],
						streamline: ['', []],
						jumboClassic: ['', []],

						prod: ['', []],
						// prod: this.fb.array([true, false, true, true, false, true, true, false, true, true, false, true, true, false, true]),
				});

				if (this.user && this.user.rules){
						this.formMain.patchValue(this.user.rules);
				}
				
				this.subs = [

						this.formMain.get('podsAll').valueChanges.subscribe(value => {
								if (value) {
										this.formMain.patchValue({'pods':null});
										this.formMain.get('pods').disable();
								} else {
										this.formMain.get('pods').enable();
								}
						}),

						this.formMain.get('executive').valueChanges.subscribe(value => {
								if (value) {
										this.formMain.patchValue({ 'podsAll': true });
										this.formMain.patchValue({ 'pods': null });
										this.formMain.get('pods').disable();
								} else {
										this.formMain.patchValue({ 'podsAll': null });
										this.formMain.get('pods').enable();
								}
						}),

						this.formMain.get('streamline').valueChanges.subscribe(value => {
								if (value) {
										this.formMain.patchValue({
												conforming: null,
												fha: null,
												va: null,
												vaSuperMax: null,
												jumbo: null,
												cq: null,
												homeReady: null,
												homePossible: null,
												'40yr': null,
												executive: null,
												jumboClassic: null,
										});
										this.formMain.get('conforming').disable();
										this.formMain.get('fha').disable();
										this.formMain.get('va').disable();
										this.formMain.get('vaSuperMax').disable();
										this.formMain.get('jumbo').disable();
										this.formMain.get('cq').disable();
										this.formMain.get('homeReady').disable();
										this.formMain.get('homePossible').disable();
										this.formMain.get('40yr').disable();
										this.formMain.get('executive').disable();
										this.formMain.get('jumboClassic').disable();
								} else {
										this.formMain.get('conforming').enable();
										this.formMain.get('fha').enable();
										this.formMain.get('va').enable();
										this.formMain.get('vaSuperMax').enable();
										this.formMain.get('jumbo').enable();
										this.formMain.get('cq').enable();
										this.formMain.get('homeReady').enable();
										this.formMain.get('homePossible').enable();
										this.formMain.get('40yr').enable();
										this.formMain.get('executive').enable();
										this.formMain.get('jumboClassic').enable();
								}
						}),

					
						
						this.formMain.valueChanges.subscribe(form => console.log(form))
				];

		}


		public rulSetAdd() {
				this.user.ruleSets = [this.user.ruleSets[0], ...this.user.ruleSets];
		}

		/**
		 * When a rule is deleted
		 */
		public ruleSetDelete(i) {
				this.user.ruleSets = this.user.ruleSets.filter((rule, index) => i != index);
		}

		/**
		 * Set a template by update the form default values
		 * @param template
		 */
		public templateSet(template: 'default' | 'power' | 'moneyed') {
				this.formMain.reset();

				switch (template) {
						case 'default':
								this.formMain.patchValue({pod:'EC2',ndc: true});
								break;
						case 'power':
								this.formMain.patchValue({ pod: 'WC1', ndc: true, mi: true, tcf: true });
								break;
						case 'moneyed':
								this.formMain.patchValue({ pod: 'EC1', tbd: true, coop: true, cema: true });
								break;
				}
		}

}
