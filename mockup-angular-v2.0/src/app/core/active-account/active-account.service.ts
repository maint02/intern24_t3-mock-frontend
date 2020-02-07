import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterService} from '../register/register.service';
import {AccountService} from '../auth/account.service';
import {flatMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ActiveAccountService {
    constructor(
        private accountService: AccountService,
    ) {
    }
    activeAccount(credentials){
        return this.accountService.activeAccount(credentials).pipe(flatMap(() => this.accountService.identity(true)));
    }
}
