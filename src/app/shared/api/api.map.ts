/**
Adding a new endpoints:
1. Create a new property in the ApiProps enum in api.properties.ts
2. Create a new entry in api.map. Add endpoint, store property and uniqueID
3. Add the end data location in the main store state in api.state.ts
*/

//import IStore
import { IStore } from '../store.d';
import { ApiProps } from './api.properties';
import * as _ from 'lodash';

export const ApiMap: IStore.ApiMapping = {

		// Example
		pods: {
				endpoint: './assets/mock-data/pods.json',
				storeProperty: ApiProps.pods,
				uniqueId: 'id',
				mapSrc: 'src',
				map: (pods: any[]) => {

						return pods.map(pod => {
								let podNew = {
										name: pod,
										rules: createModel()
								}

								return podNew;
						});
				}
		},

		// Example
		users: {
				endpoint: 'https://jsonplaceholder.typicode.com/users',
				storeProperty: ApiProps.users,
				uniqueId: 'id',
				mapSrc: 'src',
				map: (users: any[]) => {
						let usersNew = [...users, ...users, ...users, ...users, ...users, ...users, ...users, ...users, ...users, ...users];
						usersNew = usersNew.map(user => {
								return { ...user };
						});
						// Sample dictionary mapping based on id property
						let dict = {};
						let pods = {};
						usersNew = usersNew.map((user, index) => {
								user.capacityPerc = Math.floor(Math.random() * 100) + 1;
								user.capacity = (Math.floor(Math.random() * 100) + 1) / 10 + 2;
								user.load = Math.floor((user.capacity - 2.1) * 10)/10;
								user.capabilities = Math.floor(Math.random() * 10000) + 1;
								user.rules = createModel();
								user.ruleSets = [createModel()];
								user.pod = _.sample(["EC1", "EC2", "EC3", "EC4", "EC5", "WC1", "WC2", "WC3", "WC4", "WC5", "WC6", "WC7"]);
								user.id = index;
								if (!Array.isArray(pods[user.pod])){
										pods[user.pod] = [];
								}

								pods[user.pod].push(user);
								dict[user.id] = user;
								return { ...user, ...user.rules };
						});
						console.log({
								src: usersNew,
								pods: pods,
								dict: dict
						});
						return {
								src: usersNew,
								pods: pods,
								dict: dict
						};
				}
		},

		// Example
		loans: {
				endpoint: './assets/mock-data/loan-assignment.json',
				storeProperty: ApiProps.loans,
				uniqueId: 'dateProcessed',
				map: (loans: any[]) => {
						loans.forEach(loan => {
								let loansTotal = Math.floor(Math.random() * 100) + 50;
								let loansAssigned = loansTotal - Math.floor(Math.random() * 20) + 3;
								let loansUnassigned = loansTotal - loansAssigned;

								loan.loansAssigned = [];
								for (let i = 0; i < loansAssigned; i++) {
										loan.loansAssigned.push({
												lnkey: Math.floor(Math.random() * 900000) + 100000,
												type: Math.random() >= 0.5 == true ? 'Purchase' : 'Refinance',
												loanAmt: Math.floor(Math.random() * 900000) + 10000,
												mi: Math.random() >= 0.6 == true ? true : false,
												ndc: Math.random() >= 0.6 == true ? true : false,
												tbd: Math.random() >= 0.6 == true ? true : false,
												coop: Math.random() >= 0.6 == true ? true : false,
												tcf: Math.random() >= 0.6 == true ? true : false,
												'203k': Math.random() >= 0.6 == true ? true : false,
												cema: Math.random() >= 0.6 == true ? true : false,
												product: Math.random() >= 0.6 == true ? 'Conforming' : 'VA'
										});
								}

								loan.loansUnassigned = [];
								for (let i = 0; i < loansUnassigned; i++) {
										loan.loansUnassigned.push({
												lnkey: Math.floor(Math.random() * 900000) + 100000,
												type: Math.random() >= 0.5 == true ? 'Purchase' : 'Refinance',
												loanAmt: Math.floor(Math.random() * 900000) + 10000,
												mi: Math.random() >= 0.6 == true ? true : false,
												ndc: Math.random() >= 0.6 == true ? true : false,
												tbd: Math.random() >= 0.6 == true ? true : false,
												coop: Math.random() >= 0.6 == true ? true : false,
												tcf: Math.random() >= 0.6 == true ? true : false,
												'203k': Math.random() >= 0.6 == true ? true : false,
												cema: Math.random() >= 0.6 == true ? true : false,
												product: Math.random() >= 0.6 == true ? 'Conforming' : 'VA'
										});
								}

						});
						return loans;
				}
		},

}

function createModel() {
		let model = {
				ndc: false,
				ndcNon: false,
				tbd: false,
				tbdNon: false,
				tcf: false,
				tcfNon: false,
				'203k': false,
				'203kNon': false,
				prod: false,
				prodNon: false,
				mi: false,
				miNon: false,
				loanAmt: false,
				loanAmtNon: false,
				products: false,
				productsNon: false,
				purchase: false,
				refinance: false,
				coop: false,
				coopNon: false,
				cema: false,
				cemaNon: false,
				state: false,
				special: false,
				conforming: false,
				fha: false,
				va: false,
				vaSuperMax: false,
				jumboAdvantage: false,
				cqIrrl: false,
				homeReady: false,
				homePossible: false,
				fortyIo: false,
				executiveHighBalance: false,
				streamline: false,
				jumboClassic: false,
		}
		for (let key in model) {
				if (model.hasOwnProperty(key)) {
						let rand = Math.floor(Math.random() * 10) + 1;
						if (rand > 8) {
							model[key] = true;
						}
						model[key + 'Cnt'] = Math.floor(Math.random() * 10);
				}
		}

		return model;
}