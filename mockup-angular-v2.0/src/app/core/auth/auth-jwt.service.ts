import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {SERVER_API_URL} from '../../app.constants';
import {Employee} from '../../shared/model/employee/employee.model';

@Injectable({providedIn: 'root'})
export class AuthServerProvider {

    private LOGIN_PATH = 'JWT-INTERNAL/login';
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

    login(credentials): Observable<any> {

        function authenticateSuccess(resp) {
            this.$localStorage.store('logged_user', credentials.username);
            const jwt = resp.body.jwt;
            this.storeAuthenticationToken(jwt, credentials.rememberMe);
            return jwt;
        }

        return this.http.post(SERVER_API_URL + this.LOGIN_PATH, {}, {observe: 'response'}).pipe(map(authenticateSuccess.bind(this)));
    }
    // khai báo api getemp info

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
