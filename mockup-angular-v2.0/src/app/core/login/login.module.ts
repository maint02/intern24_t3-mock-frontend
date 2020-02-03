import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoginRouteAccessService} from "./login-route-access-service";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginComponent,
                canActivate: [LoginRouteAccessService]
            }
        ])
    ]
})
export class LoginModule {
}
