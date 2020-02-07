import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../core/login/login.service";
import {Router} from "@angular/router";
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../shared/model/user/account.model";
import {APP_CONFIG} from "../../app.config";

@Component({
    selector: 'smart-dropdown-user',
    templateUrl: './dropdown-user.component.html',
})
export class DropdownUserComponent implements OnInit {

    account: Account;
    avatar = APP_CONFIG.avatar;


    constructor(
        private router: Router,
        private accountService: AccountService,
        private loginService: LoginService,
    ) {
    }

    ngOnInit(): void {
        this.accountService.identity().subscribe(
            acc => this.account = acc
        );
    }

    logout(e: MouseEvent) {
        e.preventDefault();
        this.loginService.logout();
        this.router.navigate(['login']);
    }
}
