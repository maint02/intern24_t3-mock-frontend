import {Component, Injectable} from '@angular/core';
import {Employee} from './shared/model/employee/employee.model';
import {Router} from '@angular/router';
import {RoleModel} from './shared/model/employee/role.model';

@Component({
    selector: 'smart-root',
    templateUrl: './app.component.html'
})
@Injectable({
    providedIn: 'root'
})
export class AppComponent {
    currentEmployee: Employee;

    constructor(
        private router: Router,
    ) {
    }

    get isAdmin() {
        return this.currentEmployee && this.currentEmployee.roleName === RoleModel.HR;
    }

    get isManager() {
        return this.currentEmployee && this.currentEmployee.roleName === RoleModel.MANAGER;
    }

    get isLeader() {
        return this.currentEmployee && this.currentEmployee.roleName === RoleModel.LEADER;
    }
}
