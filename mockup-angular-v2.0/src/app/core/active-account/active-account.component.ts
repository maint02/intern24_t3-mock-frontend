import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActiveAccountService} from './active-account.service';
import {AlertService} from '../../shared/dialogs/sweet-alert/alert.service';

@Component({
    selector: 'smart-active-account',
    templateUrl: './active-account.component.html',
    styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {

    username: string;

    constructor(
        private route: ActivatedRoute,
        private activeAccountService: ActiveAccountService,
        public alertService: AlertService
    ) {
    }

    ngOnInit() {
    }

    doRedirect() {
        this.route.queryParams.subscribe(params => {
            this.username = params.username;
        });
        const alertObject = {
            showCancelButton: false,
            title: 'Thông báo',
            message: '',
            icon: ''
        };
        this.activeAccountService.activeAccount(this.username).subscribe(
            (value) => {
                alertObject.message = 'Tài khoản đã được active';
                alertObject.icon = 'success';
                this.alertService.fire(alertObject);
            },
            (error) => {
                alertObject.message = 'Đã xảy ra lỗi, tài khoản chưa được active';
                alertObject.icon = 'error';
                this.alertService.fire(alertObject);
            }
        );
    }
}
