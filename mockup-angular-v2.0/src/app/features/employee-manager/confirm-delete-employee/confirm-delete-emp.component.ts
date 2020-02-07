import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'smart-confirm-delete-user',
    templateUrl: './confirm-delete-emp.component.html',
    styleUrls: ['./confirm-delete-emp.component.scss']
})
export class ConfirmDeleteEmpComponent implements OnInit {
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
