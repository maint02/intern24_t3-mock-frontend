import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import {HomeComponent} from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
                canActivate: []
            }
        ])
    ]
})
export class HomeModule {
}
