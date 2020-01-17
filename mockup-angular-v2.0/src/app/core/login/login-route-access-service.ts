import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AccountService} from "../auth/account.service";

@Injectable({providedIn: 'root'})
export class LoginRouteAccessService implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.accountService.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}
