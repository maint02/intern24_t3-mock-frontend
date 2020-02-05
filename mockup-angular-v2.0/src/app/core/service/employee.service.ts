import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../shared/model/employee/employee.model';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    constructor(private  http: HttpClient) {
    }

    getAll() {
        return this.http.get<Employee[]>(`${environment.api_url}/employee/get-all`);
    }

    getById(id: bigint) {
        return this.http.get<Employee>(`${environment.api_url}/employee/get-info/${id}`);
    }
}
