import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Employee} from '../../shared/model/employee/employee.model';
import {environment} from '../../../environments/environment';
import {Account} from '../../shared/model/user/account.model';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {

    private currentEmployeeSubject: BehaviorSubject<Employee>;
    public currentEmployee: Observable<Employee>;

    constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
    }

    getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    public get getCurrentEmployee(): Employee {
        return this.currentEmployeeSubject.value;
    }

    login(account: Account): Observable<Account> {

        function authenticateSuccess(resp) {
            this.$localStorage.store('logged_user', account.login);
            const jwt = resp.body.id_token;
            this.storeAuthenticationToken(jwt, account.rememberMe);
            return jwt;
        }

        return this.http.post(environment.api_url + 'authenticate', account, {observe: 'response'}).pipe(map(authenticateSuccess.bind(this)));
    }


    storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            this.$localStorage.store('authenticationToken', jwt);
        } else {
            this.$sessionStorage.store('authenticationToken', jwt);
        }
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.$localStorage.clear('authenticationToken');
            this.$sessionStorage.clear('authenticationToken');
            this.$localStorage.clear('logged_user');
            observer.complete();
        });
    }
}
