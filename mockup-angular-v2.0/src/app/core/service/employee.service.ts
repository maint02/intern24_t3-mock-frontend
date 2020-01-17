import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../shared/model/user/employee';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    constructor(private  http: HttpClient) {
    }

    getAll() {
        return this.http.get<Employee[]>(`${environment.api_url}/employee/get-info`);
    }

    getById(id: number) {
        return this.http.get<Employee>(`${environment.api_url}/employee/get-info/${id}`);
    }
}
