import {Component, OnInit, Renderer2} from '@angular/core';
import {AccountService} from '../auth/account.service';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StateStorageService} from '../auth/state-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LocalStorageService} from 'ngx-webstorage';
import {isSuccess} from 'angular-in-memory-web-api';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {AlertService} from '../../shared/dialogs/sweet-alert/alert.service';

@Component({
    selector: 'smart-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    isRegister: string;
    loginForm = this.fb.group({
        login: [null, [Validators.required]],
        password: [null, [Validators.required]],
        rememberMe: []
    });

    constructor(
        private loginService: LoginService,
        private accountService: AccountService,
        private authenticate: AuthServerProvider,
        private fb: FormBuilder,
        private router: Router,
        private stateStorageService: StateStorageService,
        private renderer: Renderer2,
        private spinnerService: NgxSpinnerService,
        public alertService: AlertService
    ) {
    }
    ngOnInit() {
        this.setFocus();
        this.isRegister = localStorage.getItem('register-success');
        localStorage.removeItem('register-success');
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return false;
        }
        this.spinnerService.show();
        this.loginService
            .login({
                login: this.loginForm.get('login').value,
                password: this.loginForm.get('password').value,
                rememberMe: this.loginForm.get('rememberMe').value,
            })
            .subscribe(
                (res) => {
                    // gọi api get emp by username
                    // this.authenticate.getCurrentEmployee.roleName;
                    const redirect = this.stateStorageService.getUrl() || '';
                    if (redirect) {
                        this.stateStorageService.storeUrl(null);
                        this.router.navigateByUrl(redirect);
                    } else {
                        this.router.navigate(['']);
                    }
                },
                (err) => {
                    const alertObject = {
                        showCancelButton: false,
                        title: 'Thông báo',
                        message: 'Sai thông tin đăng nhập, vui lòng kiểm tra lại!',
                        icon: 'error'
                    };
                    this.alertService.fire(alertObject);
                    this.spinnerService.hide();
                }, () => {
                    this.spinnerService.hide();
                }
            );
    }

    private setFocus() {
        setTimeout(() => {
            this.renderer.selectRootElement('#login').focus();
        }, 500);
    }

    redirectToRegister(event) {
        event.preventDefault();
        this.router.navigate(['register']);
    }

    redirectToResetPass(event) {
        event.preventDefault();
        this.router.navigate(['resetPass']);
    }

}
