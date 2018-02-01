// @angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment';

// 3rd Party Tools
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Bootstrap
import { StoreModule } from '@ngrx/store';
import { DatePipe, CurrencyPipe } from '@angular/common';

// Mello Labs Tools
import { ApiToolsModule, ApiReducer, ApiStatusReducer } from '@mello-labs/api-tools';
import { FormToolsModule } from '@mello-labs/form-tools';
import { UtilitiesModule } from '@mello-labs/utilities';
import { DatagridModule } from '@mello-labs/datagrid';

// Main entrypoint component
import { AppComponent } from './app.component';
// Routing Module
import { ROUTES } from './app.routes';

// Enables faster prod mode, does disable some dirty error checking though
enableProdMode();

// Routes
import {
		NoContentComponent, LoginComponent, HomeComponent, PodsComponent,
	UserAdminComponent, LoanAssignmentComponent
} from '@routes';

// Components
import {
	FooterComponent, HeaderComponent, LayoutMainComponent, LayoutSingleComponent, NavComponent, NavSearchComponent,
	ConfirmationModalComponent, LogoutModalComponent,
	LaunchModalComponent, UserAddModalComponent, LoanAssignModalComponent,

	AssignmentRulesComponent, PtoCalendarComponent, CapacityComponent
} from '@components';

// Shared
import {
	GlobalErrorHandler,
	AuthService,
	AppSettings,
	
	// Interceptors
	AuthGuard,
	HttpInterceptorService,

	// Pipes
	FilterPipe, DebouncePipe
} from '@shared';

import {
	ApiService
} from '@api';

import {
	UIStoreReducer,
	UIModalService,
	UIStoreService,
} from '@ui';

// Application wide providers
export const APP_COMPONENTS = [
	NoContentComponent, LoginComponent, HomeComponent, UserAdminComponent,

	FooterComponent, HeaderComponent, LayoutMainComponent, LayoutSingleComponent, NavComponent, NavSearchComponent,
	LaunchModalComponent, UserAddModalComponent, LoanAssignModalComponent, LoanAssignmentComponent, LoanAssignModalComponent,

	ConfirmationModalComponent, LogoutModalComponent,

	AssignmentRulesComponent, PtoCalendarComponent, CapacityComponent
];

// Application wide providers
export const APP_PROVIDERS = [
	HttpInterceptorService,
	AuthService,
	ApiService,
	AppSettings,
	UIModalService,
	UIStoreService,
	AuthGuard,

	// Pipes
	DatePipe, CurrencyPipe, FilterPipe,

	{// Global exception handler
		provide: ErrorHandler,
		useClass: GlobalErrorHandler
	},
];


@NgModule({
	declarations: [
		AppComponent,
		APP_COMPONENTS,
		FilterPipe, DebouncePipe, PodsComponent
	],
	imports: [
		// Angular
		BrowserModule,
		FormsModule, ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
		window.location.protocol == 'https:' && environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],

		NgbModule.forRoot(),// ng-bootstrap
		StoreModule.forRoot({ api: ApiReducer, apiStatus: ApiStatusReducer, ui: UIStoreReducer }),// NGRX

		// Mello Labs
		ApiToolsModule.forRoot(),
		FormToolsModule.forRoot(),
		UtilitiesModule.forRoot(),
		DatagridModule.forRoot()
	],
	providers: [
		APP_PROVIDERS,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent],
	entryComponents: [
		ConfirmationModalComponent, LogoutModalComponent, UserAddModalComponent, LoanAssignModalComponent
	]
})
export class AppModule { }
