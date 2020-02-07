import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ActiveAccountComponent} from './active-account.component';
import {FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
    declarations: [ActiveAccountComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgxSpinnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: ActiveAccountComponent,
                redirectTo: ''
                // canActivate: []
            }
        ])
    ]
})
export class ActiveAccountModule {

}
