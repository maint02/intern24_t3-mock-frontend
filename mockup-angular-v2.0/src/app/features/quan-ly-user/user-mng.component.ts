import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {dl_quan_ly_user} from './dl-quan-ly-user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InsertUpdateUserComponent} from './insert-update-user/insert-update-user.component';
import {ConfirmDeleteUserComponent} from './confirm-delete-user/confirm-delete-user.component';

@Component({
    selector: 'smart-user-mng',
    templateUrl: './user-mng.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMngComponent implements OnInit {

    constructor(public modal: NgbModal) {
    }

    ADD = 'ADD';
    UPDATE = 'UPDATE';
    users: any[] = dl_quan_ly_user;
    status: any = [{id: 1, value: 1, name: 'Hoạt động'}, {id: 2, value: 0, name: 'Không hoạt động'}];

    selectedItems = [];

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
    }

    add() {
        const modalRef = this.modal.open(InsertUpdateUserComponent, {size: 'lg'});
        modalRef.componentInstance.actionType = this.ADD;
    }

    doEdit(event: MouseEvent, dataItem) {
        event.preventDefault();
        const modalRef = this.modal.open(InsertUpdateUserComponent, {size: 'lg'});
        modalRef.componentInstance.actionType = this.UPDATE;
        modalRef.componentInstance.selectedItem = dataItem;
    }

    doDelete(event: MouseEvent, dataItem) {
        event.preventDefault();
        const modalRef = this.modal.open(ConfirmDeleteUserComponent, {size: 'sm'});
        modalRef.componentInstance.selectedItem = dataItem;
    }

    doSearch() {

    }

}
