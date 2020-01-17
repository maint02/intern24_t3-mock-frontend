import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {SERVER_API_URL} from '../../app.constants';
import {Account} from '../../shared/model/user/account.model';


@Injectable({providedIn: 'root'})
export class AuthServerProvider {
    private LOGIN_PATH = 'JWT-INTERNAL/login';
    private currentEmployeeSubject: BehaviorSubject<Account>;
    public currentEmployee: Observable<Account>;


    constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {
        this.currentEmployeeSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentEmployee')));
        this.currentEmployee = this.currentEmployeeSubject.asObservable();
    }

    getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    public get getCurrentEmployee(): Account {
        return this.currentEmployeeSubject.value;
    }

    login(credentials): Observable<any> {

        function authenticateSuccess(resp) {
            this.$localStorage.store('logged_user', credentials.username);
            const jwt = resp.body.jwt;
            this.storeAuthenticationToken(jwt, credentials.rememberMe);
            return jwt;
        }

        return this.http.post<any>(SERVER_API_URL + this.LOGIN_PATH, {}, {observe: 'response'}).pipe(map(account => {
            localStorage.setItem('currentEmployee', JSON.stringify(account));
            this.currentEmployeeSubject.next(account);
        }));
        //     return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, {username, password})
        //         .pipe(map(user => {
        //             // login successful if there's a jwt token in the response
        //             if (user && user.token) {
        //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
        //                 localStorage.setItem('currentUser', JSON.stringify(user));
        //                 this.currentUserSubject.next(user);
        //             }
        //
        //             return user;
        //         }));

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
