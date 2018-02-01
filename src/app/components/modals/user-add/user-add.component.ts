import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
		selector: 'user-add',
		templateUrl: './user-add.component.html'
})
export class UserAddModalComponent implements OnInit {

		public data: any; // Data is actually passed through the modal service not here
		public dataAlt: any; // Data is actually passed through the modal service not here
		public onSuccess: EventEmitter<any> = new EventEmitter();

		constructor(
				public activeModal: NgbActiveModal
		) { }

		ngOnInit() {
				console.log(this.data);
		}

    /**
     * Submit the form
     */
		submit() {
			
				this.activeModal.close('Success');
		}//end submit

}
