import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {GridModule} from "@progress/kendo-angular-grid";
import {DateInputsModule} from "@progress/kendo-angular-dateinputs";
import {TooltipModule} from "@progress/kendo-angular-tooltip";
import {SbDropdownModule} from "./sb-dropdown/sb-dropdown.module";
import {InputTrimModule} from "ng2-trim-directive";
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        GridModule,
        DateInputsModule,
        TooltipModule,
        SbDropdownModule,
        InputTrimModule,
        DropDownsModule
    ]
})
export class SharedLibsModule {
}
