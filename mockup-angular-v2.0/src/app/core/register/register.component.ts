import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from '../auth/account.service';
import {StateStorageService} from '../auth/state-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {RegisterService} from './register.service';
import {AlertService} from '../../shared/dialogs/sweet-alert/alert.service';
import {isRegExp} from 'util';

@Component({
    selector: 'smart-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        fullName: [null],
        phoneNumber: [null],
        email: [null, [Validators.required]],
        skypeAccount: [null, [Validators.required]],
        birthday: [null],
        userType: [null],
        address: [null],
        university: [null],
        graduatedYear: [null]
    });
    submitted: any;
    currentYear: number;
    regExpPhone: any;
    regExpEmail: any;
    regExpUsername: any;

    constructor(
        private registerService: RegisterService,
        private accountService: AccountService,
        private fb: FormBuilder,
        public alertService: AlertService,
        private router: Router,
        private stateStorageService: StateStorageService,
        private renderer: Renderer2,
        private spinnerService: NgxSpinnerService
    ) {

    }

    ngOnInit() {
        this.currentYear = new Date().getFullYear();
        this.regExpPhone = new RegExp('^0[0-9]{9}');
        this.regExpEmail = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}');
        this.regExpUsername = new RegExp('^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])');
    }

    get f() {
        return this.registerForm.controls;
    }


    validateData() {
        const alertObject = {
            showCancelButton: false,
            title: 'Thông báo',
            message: '',
            icon: 'warning'
        };
        // debugger;
        if (this.registerForm.value.username == null) {
            alertObject.message = 'Username không được để trống';
            this.alertService.fire(alertObject);
            return false;
        } else if (!this.regExpUsername.test(this.registerForm.value.username)) {
            alertObject.message = 'Vui lòng kiểm tra lại username';
            this.alertService.fire(alertObject);
            return false;
        }
        if (this.registerForm.value.email == null) {
            alertObject.message = 'Email không được để trống';
            this.alertService.fire(alertObject);
        } else if (!this.regExpEmail.test(this.registerForm.value.email)) {
            alertObject.message = 'Email nhập sai, vui lòng nhập lại';
            this.alertService.fire(alertObject);
            return false;
        }
        if (this.registerForm.value.fullName == null){
            alertObject.message = 'Họ tên không được để trống';
            this.alertService.fire(alertObject);
            return false;
        }
        if (!this.regExpPhone.test(this.registerForm.value.phoneNumber)) {
            alertObject.message = 'Số điện thoại không đúng, nhập lại';
            this.alertService.fire(alertObject);
            return false;
        }
        if (this.registerForm.value.birthday == null){
            alertObject.message = 'Ngày sinh không được để trống';
            this.alertService.fire(alertObject);
            return false;
        }
        return true;
    }

    doRegister() {
        if (!this.validateData()) {
            return false;
        }
        const alertObject = {
            showCancelButton: false,
            title: 'Thông báo',
            message: '',
            icon: ''
        };
        if (this.registerForm.value.username == null || this.registerForm.value.email == null) {
            alertObject.message = 'Vui lòng nhập những trường bắt buộc';
            alertObject.icon = 'error';
            return false;
        }
        if (this.registerForm.value.graduatedYear != null) {
            if (this.registerForm.value.graduatedYear > this.currentYear || this.registerForm.value.graduatedYear < 1970) {
                alertObject.message = 'Năm tốt nghiệp không lớn hơn năm hiện tại và nhỏ hơn 1970';
                alertObject.icon = 'warning';
                this.alertService.fire(alertObject);
                return false;
            }
        }
        console.log('\'' + this.registerForm.value.graduatedYear + '\'');

        // if (this.registerForm.invalid) {
        //     alertObject.message = 'Điền thông tin chưa đúng, xin vui lòng kiểm tra lại';
        //     alertObject.icon = 'warning';
        //     this.alertService.fire(alertObject);
        //     return false;
        // }

        this.spinnerService.show();
        this.registerService.register(this.registerForm.value).subscribe
        (
            (res) => {
                alertObject.message = 'Đăng ký thành công, vui lòng kiểm tra email để biết mật khẩu đăng nhập';
                alertObject.icon = 'success';
                this.alertService.fire(alertObject);
                this.registerForm.reset();
            },
            (err) => {
                // alertObject here
                console.log(err);
                this.spinnerService.hide();
                if (err.status === 500) {
                    if (err.error.responseCode === 5) {
                        alertObject.message = 'Username đã tồn tại, vui lòng nhập username khác';
                        alertObject.icon = 'error';
                        this.alertService.fire(alertObject);
                    } else if (err.error.responseCode === 6) {
                        alertObject.message = 'Email đã tồn tại, vui lòng nhập email khác ';
                        alertObject.icon = 'error';
                        this.alertService.fire(alertObject);
                    } else {
                        alertObject.message = 'Đã có lỗi xảy ra, vui lòng thử lại sau';
                        alertObject.icon = 'error';
                        this.alertService.fire(alertObject);
                    }
                }
            }, () => {
                this.spinnerService.hide();
            }
        );
    }


}
