import {Component, Injectable, OnInit} from '@angular/core';
import {LoginService} from "../../core/login/login.service";
import {Router} from "@angular/router";
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../shared/model/user/account.model";
import {APP_CONFIG} from "../../app.config";
import {LocalStorageService} from "ngx-webstorage";

@Component({
    selector: 'smart-dropdown-user',
    templateUrl: './dropdown-user.component.html',
})

@Injectable({providedIn: 'root'})
export class DropdownUserComponent implements OnInit {

    account: Account;
    avatar = APP_CONFIG.avatar;
    loggedUser: any;

    constructor(
        private $localStorage: LocalStorageService,
        private router: Router,
        private accountService: AccountService,
        private loginService: LoginService
    ) {

    }

    ngOnInit(): void {
        this.accountService.identity().subscribe(
            acc => this.account = acc
        );
        this.loggedUser = this.$localStorage.retrieve('logged_user');
    }

    logout(e: MouseEvent) {
        e.preventDefault();
        this.loginService.logout();
        this.accountService.logout();
        this.router.navigate(['login']);
    }
}
