/**
Adding a new endpoints:
1. Create a new property in the ApiProps enum in api.properties.ts
2. Create a new entry in api.map. Add endpoint, store property and uniqueID
3. Add the end data location in the main store state in api.state.ts
*/

//import IStore
import { IStore } from '../store.d';
import { ApiProps } from './api.properties';

export const ApiMap: IStore.ApiMapping = {

	// Example
	users: {
		endpoint: 'https://jsonplaceholder.typicode.com/users',
		storeProperty: ApiProps.users,
		uniqueId: 'id',
		mapSrc: 'src',
		map: (users: any[]) => {
			let usersNew = [...users, ...users, ...users, ...users, ...users,];
			// Sample dictionary mapping based on id property
			let dict = {};
			usersNew.forEach((user, index) => {
				user.capacityPerc = Math.floor(Math.random() * 100) + 1;
				user.capacity = (Math.floor(Math.random() * 100) + 1) / 10 + 2;
				user.capabilities = Math.floor(Math.random() * 10000) + 1;
				user.rules = createModel();
				user.ruleSets = [createModel()];

				user.id = index;
				dict[user.id] = user
			});
			return {
				src: usersNew,
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
						mi: Math.random() >= 0.5 == true ? true : false,
						ndc: Math.random() >= 0.5 == true ? true : false,
						tbd: Math.random() >= 0.5 == true ? true : false,
						coop: Math.random() >= 0.5 == true ? true : false,
						tcf: Math.random() >= 0.5 == true ? true : false,
						'203k': Math.random() >= 0.5 == true ? true : false,
						cema: Math.random() >= 0.5 == true ? true : false,
						product: Math.random() >= 0.5 == true ? 'Conforming' : 'VA'
					});
				}

				loan.loansUnassigned = [];
				for (let i = 0; i < loansUnassigned; i++) {
					loan.loansUnassigned.push({
						lnkey: Math.floor(Math.random() * 900000) + 100000,
						type: Math.random() >= 0.5 == true ? 'Purchase' : 'Refinance',
						loanAmt: Math.floor(Math.random() * 900000) + 10000,
						mi: Math.random() >= 0.5 == true ? true : false,
						ndc: Math.random() >= 0.5 == true ? true : false,
						tbd: Math.random() >= 0.5 == true ? true : false,
						coop: Math.random() >= 0.5 == true ? true : false,
						tcf: Math.random() >= 0.5 == true ? true : false,
						'203k': Math.random() >= 0.5 == true ? true : false,
						cema: Math.random() >= 0.5 == true ? true : false,
						product: Math.random() >= 0.5 == true ? 'Conforming' : 'VA'
					});
				}

			});
			return loans;
		}
	},

}

function createModel() {
	let model = {
		ndc: null,
		tbd: null,
		tcf: null,
		'203k': null,
		prod: null,
		mi: null,
		loanAmt: null,
		products: null,
		type: null,
		coop: null,
		cema: null,
		state: null,
		special: null,
	}
	for (let key in model) {
		if (model.hasOwnProperty(key)) {
			let rand = Math.floor(Math.random() * 10) + 1;
			if (rand > 7) {
				model[key] = 'Yes';
			} else if (rand > 5) {
				model[key] = 'No';
			}
		}
	}
	return model;
}