import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'smart-confirm-delete-user',
    templateUrl: './confirm-delete-user.component.html',
    styleUrls: ['./confirm-delete-user.component.scss']
})
export class ConfirmDeleteUserComponent implements OnInit {
    @Input() selectedItem: any;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {

    }


    public onSubmit() {
        this.activeModal.dismiss();
    }

    public cancel() {
        this.activeModal.dismiss();
    }

}
