import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GridModule, SharedModule} from "@progress/kendo-angular-grid";
import {TimePickerModule} from "@progress/kendo-angular-dateinputs";
import {RouterModule} from "@angular/router";
import {MultiColumnHeadersComponent} from './multi-column-headers/multi-column-headers.component';
import {DynamicColumnComponent} from './dynamic-column/dynamic-column.component';
import {KeysPipe} from "./keys.pipe";
import {UserRouteAccessService} from "../core/auth/user-route-access-service";
import {DropDownsModule} from "@progress/kendo-angular-dropdowns";
import {PopupModule} from "@progress/kendo-angular-popup";

@NgModule({
    declarations: [MultiColumnHeadersComponent, DynamicColumnComponent, KeysPipe],
    entryComponents: [],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        GridModule,
        ReactiveFormsModule,
        TimePickerModule,
        RouterModule.forChild([
            {path: '', pathMatch: 'full', redirectTo: 'multi-column-headers'},
            {
                path: 'multi-column-headers',
                component: MultiColumnHeadersComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    authorities: [],
                    breadcrumbs: ['Examples', 'MultiColumnHeaders']
                }
            },
            {
                path: 'dynamic-column',
                component: DynamicColumnComponent,
                canActivate: [UserRouteAccessService],
                data: {
                    authorities: [],
                    breadcrumbs: ['Examples', 'DynamicColumn']
                }
            }
        ]),
        SharedModule,
        DropDownsModule,
        PopupModule
    ]
})
export class ExamplesModule {
}
