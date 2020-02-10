import {Injectable} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {SERVER_API_URL} from '../../app.constants';
import {Account} from '../../shared/model/user/account.model';
import {environment} from '../../../environments/environment';
import {USER_TYPE_AUTHORITIES} from './user-type-authorities';

@Injectable({providedIn: 'root'})
export class AccountService {
    private userIdentity: Account;
    private authenticated = false;
    private authenticationState = new Subject<any>();
    private accountCache$: Observable<Account>;
    private resourceUrl = 'user/get/';

    constructor(
        private sessionStorage: SessionStorageService,
        private localStorage: LocalStorageService,
        private http: HttpClient
    ) {
    }

    fetch(): Observable<Account> {
        const loggedUser = this.localStorage.retrieve('logged_user');
        return this.http.get<HttpResponse<any>>(SERVER_API_URL + this.resourceUrl + loggedUser, {observe: "response"}).pipe(
            map((response: HttpResponse<any>) => {
                let account: Account;
                account = Object.assign(new Account(), response.body);
                account.authorities = USER_TYPE_AUTHORITIES[account.roleId];
                this.localStorage.store('sb_code', account.username);
                return account;
            })
        );
    }

    save(account: Account): Observable<Account> {
        return this.http.post<Account>(environment.api_url + 'account', account);
    }

    register(account: Account): Observable<Account> {
        return this.http.post<Account>(environment.api_url + 'user/register', account);
    }

    activeAccount(account: Account): Observable<Account> {
        return this.http.get<Account>(environment.api_url + 'user/active-account/{username}');
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

    logout(): void {
        this.authenticated = false;
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
