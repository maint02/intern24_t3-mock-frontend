import {Component, OnInit} from '@angular/core';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {Employee} from '../../shared/model/user/employee';
import {first} from 'rxjs/operators';
import {EmployeeService} from '../service/employee.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    loading = false;
    currentEmployee: Employee;
    employeeFromApi: Employee;

    constructor(
        private employeeService: EmployeeService,
        private authServerProvider: AuthServerProvider
    ) {
        this.currentEmployee = this.authServerProvider.getCurrentEmployee;
    }

    ngOnInit() {
        this.loading = true;
        this.employeeService.getById(this.currentEmployee.id).pipe(first()).subscribe(employee => {
            this.loading = false;
            this.employeeFromApi = employee;
        });
    }
}
