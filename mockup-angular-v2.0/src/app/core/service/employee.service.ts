import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../shared/model/employee/employee.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Account} from '../../shared/model/user/account.model';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    constructor(private  http: HttpClient) {
    }

    search(account: Account): Observable<Employee[]> {
        return this.http.post<Employee[]>(`${environment.api_url}user/search`, account);
    }

    getById(id: bigint) {
        return this.http.get<Employee>(`${environment.api_url}employee/get-info/${id}`);
    }
}
