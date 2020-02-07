import {Injectable} from '@angular/core';
import {flatMap} from 'rxjs/operators';
import {AccountService} from '../auth/account.service';
import {AuthServerProvider} from '../auth/auth-jwt.service';

@Injectable({providedIn: 'root'})
export class RegisterService {
    constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {
    }

    register(employee) {
        return this.accountService.register(employee).pipe(flatMap(() => this.accountService.identity(true)));
    }

}
