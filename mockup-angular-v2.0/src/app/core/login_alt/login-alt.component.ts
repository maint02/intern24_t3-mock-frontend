import {Component, OnInit} from '@angular/core';
import {LoginService} from "../login/login.service";
import {AccountService} from "../auth/account.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {StateStorageService} from "../auth/state-storage.service";

@Component({
    selector: 'smart-login',
    templateUrl: './login-alt.component.html',
    styleUrls: ['./login-alt.component.scss']
})
export class LoginAltComponent implements OnInit {

    loginForm = this.fb.group({
        username: [],
        password: [],
        rememberMe: []
    });

    constructor(
        private loginService: LoginService,
        private accoutService: AccountService,
        private fb: FormBuilder,
        private router: Router,
        private stateStorageService: StateStorageService,
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.loginService
            .login({
                username: this.loginForm.get('username').value,
                password: this.loginForm.get('password').value,
                rememberMe: this.loginForm.get('rememberMe').value,
            })
            .subscribe(
                (res) => {
                    const redirect = this.stateStorageService.getUrl();
                    if (redirect) {
                        this.stateStorageService.storeUrl(null);
                        this.router.navigateByUrl(redirect);
                    } else {
                        this.router.navigateByUrl('');
                    }
                },
                (err) => {
                    console.info('co loi xay ra');
                }
            );
    }
}
