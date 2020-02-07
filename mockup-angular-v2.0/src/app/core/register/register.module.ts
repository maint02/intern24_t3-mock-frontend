import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// import {LoginRouteAccessService} from './regis-route-access-service';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: RegisterComponent
                // canActivate: [LoginRouteAccessService]
            }
        ])
    ]
})

export class RegisterModule {
}
