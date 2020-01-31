import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginAltComponent} from './login-alt.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [LoginAltComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: LoginAltComponent,
                // canActivate: [LoginRouteAccessService]
            }
        ])
    ]
})
export class LoginAltModule {
}
