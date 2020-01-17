import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserMngComponent} from './user-mng.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridModule} from '@progress/kendo-angular-grid';
import {InsertUpdateUserComponent} from './insert-update-user/insert-update-user.component';
import {ConfirmDeleteUserComponent} from './confirm-delete-user/confirm-delete-user.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [UserMngComponent, InsertUpdateUserComponent, ConfirmDeleteUserComponent],
    entryComponents: [InsertUpdateUserComponent, ConfirmDeleteUserComponent],
    imports: [
        CommonModule,
        SharedModule,
        NgbModule,
        FormsModule,
        GridModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', redirectTo: 'user-mng'},
            {
                path: 'user-mng', component: UserMngComponent,
                data: {breadcrumbs: ['QuanLyUser', '']}
            }
        ])
    ]
})
export class UserMngModule {
}
