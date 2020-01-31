import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {SERVER_API_URL} from "../../app.constants";
import {Account} from "../../shared/model/user/account.model";

@Injectable({providedIn: 'root'})
export class AccountService {
    private userIdentity: Account;
    private authenticated = false;
    private authenticationState = new Subject<any>();
    private accountCache$: Observable<Account>;
    private resource_url = "/api?path=GetEmployeeInfo";

    constructor(
        private sessionStorage: SessionStorageService,
        private localStorage: LocalStorageService,
        private http: HttpClient
    ) {
    }

    fetch(): Observable<Account> {
        const logged_user = this.localStorage.retrieve('logged_user');
        const body = {
            "header": {
                "reqType": "REQUEST",
                "trusted": "false"

            },
            "body": {
                "command": "GetEmployeeInfo",
                "userID": logged_user,
                "emp_code": ""
            }
        };
        // return this.http.post<HttpResponse<any>>(SERVER_API_URL + this.resource_url, body, {observe: "response"}).pipe(
        //     map((response: HttpResponse<any>) => {
        //         let account: Account;
        //         account = Object.assign(new Account(), response.body.body.datares[0]);
        //         account.authorities = USER_TYPE_AUTHORITIES[account.type];
        //         this.localStorage.store('sb_code', account.emp_code);
        //         return account;
        //     })
        // );
        const account = {
            "username": "admin",
            "authorities": ["ROLE_CBNV", "ROLE_HR", "ROLE_QUANLY", "ROLE_ADMIN"],
            "type": "1",
            "activated": true
        };
        return of(account);
    }

    save(account: Account): Observable<Account> {
        return this.http.post<Account>(SERVER_API_URL + 'api/account', account);
    }

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[] | string): boolean {
        if (!authorities || !authorities.length) {
            return true;
        }

        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }

        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }

        return authorities.some((authority: string) => this.userIdentity.authorities.includes(authority));
    }

    identity(force?: boolean): Observable<Account> {
        if (force) {
            this.accountCache$ = null;
        }

        if (!this.accountCache$) {
            this.accountCache$ = this.fetch().pipe(
                tap(
                    account => {
                        if (account) {
                            this.userIdentity = account;
                            this.authenticated = true;
                            // After retrieve the account info, the language will be changed to
                            // the user's preferred language configured in the account setting
                            if (this.userIdentity.langKey) {
                                const langKey = this.sessionStorage.retrieve('locale') || this.userIdentity.langKey;
                                // this.languageService.changeLanguage(langKey);
                            }
                        } else {
                            this.userIdentity = null;
                            this.authenticated = false;
                        }
                        this.authenticationState.next(this.userIdentity);
                    },
                    () => {
                        this.userIdentity = null;
                        this.authenticated = false;
                        this.authenticationState.next(this.userIdentity);
                    }
                ),
                shareReplay()
            );
        }
        return this.accountCache$;
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): string {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}
