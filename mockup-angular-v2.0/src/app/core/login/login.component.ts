import {Component, OnInit, Renderer2} from '@angular/core';
import {AccountService} from '../auth/account.service';
import {LoginService} from './login.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {StateStorageService} from '../auth/state-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthServerProvider} from '../auth/auth-jwt.service';

@Component({
    selector: 'smart-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    loginForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        rememberMe: []
    });

    constructor(
        private loginService: LoginService,
        private accountService: AccountService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private stateStorageService: StateStorageService,
        private renderer: Renderer2,
        private spinnerService: NgxSpinnerService,
        private authServerProvider: AuthServerProvider
    ) {
        // redirect to home if already logged in
        if (this.authServerProvider.getCurrentEmployee) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.setFocus();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return false;
        }
        this.spinnerService.show();
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
                }, () => {
                    this.spinnerService.hide();
                }
            );
    }

    private setFocus() {
        setTimeout(() => {
            this.renderer.selectRootElement('#username').focus();
        }, 500);
    }
}
