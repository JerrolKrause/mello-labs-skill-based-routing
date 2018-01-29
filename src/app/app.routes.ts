import { Routes } from '@angular/router';
import {
		HomeComponent,
		NoContentComponent,
		LoginComponent,
		UserAdminComponent,
		LoanAssignmentComponent
} from '@routes';

import { LayoutMainComponent } from '@components';
import { AuthGuard } from '@shared';

const titleSlug: string = ' | Delegator'; // Append to page title - TODO: Migrate to an environment variable

export const ROUTES: Routes = [
		// Routes without masterpage or that do not need to be authenticated need to go first
		{ path: 'login', component: LoginComponent, data: { title: 'Please Log In' + titleSlug } },
		//{ path: 'loan/:LNKey', component: HomeComponent, data: { title: 'Dashboard' + titleSlug }, canActivate: [AuthGuard], },

		// Routes that use masterpage go here
		// canActivate with AuthGuard determines if this is an authenticated only route
		{
				path: '', component: LayoutMainComponent,
				children: [
						{ path: '', component: UserAdminComponent, data: { title: 'Distribution Roles' + titleSlug }, canActivate: [AuthGuard], },
						{ path: 'loan-assignment', component: LoanAssignmentComponent, data: { title: 'Loan Assignment' + titleSlug }, canActivate: [AuthGuard], },
						{ path: '**', component: NoContentComponent, data: { title: 'Page Not Found' + titleSlug }, canActivate: [AuthGuard], },
				]
		},
];
