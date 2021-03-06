import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiHttpService, ApiActions } from '@mello-labs/api-tools';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { IStore, AppSettings } from '@shared';
import { ApiProps } from './api.properties';
import { ApiMap } from './api.map';

@Injectable()
export class ApiService extends ApiHttpService {

		public pods$ = this.store.select(store => store.api.pods);
		public users$ = this.store.select(store => store.api.users);
		public loans$ = this.store.select(store => store.api.loans);

		/** Get the API state using api props */
		public getState$ = (apiProp: ApiProps) => this.store.select(store => store.apiStatus[apiProp]);
		/** Get the API data using api props */
		public getData$ = (apiProp: ApiProps) => this.store.select(store => store.api[apiProp]);


		/** Location of prod app environment settings */
		public envSettingsUrlProd = '/api/config'; // Localize
		/** Location of dev app environment settings */
		public envSettingsUrlDev = './assets/mock-data/env-settings.json';

		constructor(
				private http: HttpClient,
				private store: Store<IStore.root>,
				private router: Router,
				private settings: AppSettings
		) {
				super(http, store, router);
				// On instantiation, load environment settings
				this.appSettingsGet().subscribe(settings => this.appSettingsUpdate(settings), error => console.error('Unable to get env settings', error));
		}

		/** Sample store usage */
		public users = {
				get: (update?: boolean) => this.getStore(ApiMap.users.endpoint, ApiMap.users, update),
				getOne: (user, update?: boolean) => this.getStore(ApiMap.users.endpoint + '/' + user.id, ApiMap.users, update),
				post: (user) => this.postStore(ApiMap.users.endpoint, ApiMap.users, user),
				put: (user) => this.putStore(ApiMap.users.endpoint + '/' + user.id, ApiMap.users, user),
				delete: (user) => this.deleteStore(ApiMap.users.endpoint + '/' + user.id, ApiMap.users, user)
		}

		public loans = {
				get: (update?: boolean) => this.getStore(ApiMap.loans.endpoint, ApiMap.loans, update),
		}

		public pods = {
				get: (update?: boolean) => this.getStore(ApiMap.pods.endpoint, ApiMap.pods, update),
		}

		/**
		 * Set all env settings in app settings
		 * @param settings
		 */
		public appSettingsUpdate(settings) {
				this.settings.apiUrl = settings.ApiUrl;
		}

		/**
		* Get app and user settings needed by the API. This needs to happen before any subsequent calls
		*/
		public appSettingsGet(update?: boolean): Observable<any> {
				// If app is localhost:4200, use local settings settings instead

				const envUrl = this.settings.isDev ? this.envSettingsUrlDev : this.envSettingsUrlProd;
				return this.get(envUrl, update).catch(error => {
						if (error.status == 401 || error.status == 403) {
								error.errorMsg = 'Unable to get start up settings ';
								sessionStorage.clear();
								this.router.navigate(['/']);
								return Observable.throw(false);
						} else {
								return Observable.throw(error);
						}
				});
		}

		/**
		* Reset all errors in the api state
		*/
		public resetErrors(): void {
				this.store.dispatch({
						type: ApiActions.RESET_ERRORS,
						payload: null
				});// Update store with new state
		}

		/**
		* Reset all errors in the api state
		*/
		public resetSuccess(): void {
				this.store.dispatch({
						type: ApiActions.RESET_SUCCESS,
						payload: null
				});// Update store with new state
		}

}