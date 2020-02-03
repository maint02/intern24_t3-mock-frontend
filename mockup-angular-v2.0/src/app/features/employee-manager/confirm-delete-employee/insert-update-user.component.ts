import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'smart-insert-update-user',
    templateUrl: './insert-update-employee.component.html',
    styleUrls: ['./insert-update-user.component.scss']
})
export class InsertUpdateUserComponent implements OnInit {
    @Input() actionType: any;
    @Input() selectedItem: any;
    title: any = '';
    khois: any = [{id: 1, name: 'Ngân Hàng'}, {id: 2, name: 'Chăm sóc KH'}];
    donvi: any = [{id: 1, name: 'SeABank'}];
    status: any = [{id: 1, value: 1, name: 'Hiệu lực'}, {id: 2, value: 0, name: 'Không hiệu lực'}];
    moment = moment;
    submitted: boolean =  false;

    constructor(
        public activeModal: NgbActiveModal,
        public fb: FormBuilder) {
    }

    addUpdateForm = this.fb.group({
        user_name: ['', Validators.required],
        password: ['', Validators.required],
        reinput_password: ['', Validators.required],
        full_name: ['', Validators.required],
        khoi: [null, Validators.required],
        don_vi: [null, Validators.required],
        status: [1, []]
    });

    ngOnInit() {
        if ('ADD' === this.actionType) {
            this.title = 'Thêm mới User';
        } else {
            this.title = 'Cập nhật thông tin User';
        }
    }

    get f() {
        return this.addUpdateForm.controls;
    }

    public onSubmit() {
        // this.submitted = true;
        // if (this.addUpdateForm.invalid) {
        //     return;
        // }
        // this.submitted = false;
        console.log('----- dong man hinh!!');
        this.activeModal.dismiss();
    }

    public cancel() {
        this.activeModal.dismiss();
    }

}
