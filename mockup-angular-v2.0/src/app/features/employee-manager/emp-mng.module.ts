import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridModule} from '@progress/kendo-angular-grid';
import {RouterModule} from '@angular/router';
import {EmpMngComponent} from './emp-mng.component';
import {SharedModule} from '../../shared/shared.module';
import {InsertUpdateEmpComponent} from './insert-update-employee/insert-update-user.component';
import {ConfirmDeleteEmpComponent} from './confirm-delete-employee/confirm-delete-emp.component';
import {Employee} from '../../shared/model/employee/employee.model';
import {MyIfDirective} from '../../my-if.directives';
import {PaginationModule} from "ngx-bootstrap";

@NgModule({
    declarations: [EmpMngComponent, InsertUpdateEmpComponent, ConfirmDeleteEmpComponent, MyIfDirective],
    entryComponents: [InsertUpdateEmpComponent, ConfirmDeleteEmpComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgbModule,
        FormsModule,
        GridModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', redirectTo: 'emp-mng'},
            {
                path: 'emp-mng', component: EmpMngComponent,
                // children: [{path: 'list-by-username/:empUsername'}]
            }
        ]),
        PaginationModule
    ]
})
export class EmpMngModule {

}
