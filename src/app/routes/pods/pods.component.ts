import { Component, OnInit } from '@angular/core';
import { ApiService, ApiProps } from '@api';
import { UIStoreService } from '@ui';

@Component({
		selector: 'app-pods',
		templateUrl: './pods.component.html',
		styleUrls: ['./pods.component.scss']
})
export class PodsComponent implements OnInit {

		public view: 'pods' | 'users' | 'products' = 'pods';

		public pods$ = this.api.pods$;
		public podsState$ = this.api.getState$(ApiProps.pods);
		public users$ = this.api.users$;
		public usersState$ = this.api.getState$(ApiProps.users);

		public podRollup = {};

		constructor(
				private api: ApiService,
				public ui: UIStoreService
		) { }

		ngOnInit() {
				this.api.pods.get().subscribe();
				this.api.users.get().subscribe();

				// Map pod capabilities
				this.users$.subscribe((users: any) => {
						if (users) {
								for (let pod in users.pods) {
										if (users.pods.hasOwnProperty(pod)) {
												let podCapabilities = {};
												(<any[]>users.pods[pod]).forEach(user => {
														for (let rule in user.rules) {
																if (user.rules.hasOwnProperty(rule) && user.rules[rule]){
																		podCapabilities[rule] = true;
																}
														}
												});
												this.podRollup[pod] = podCapabilities;
										}
								}
						}
				});
		}

}
