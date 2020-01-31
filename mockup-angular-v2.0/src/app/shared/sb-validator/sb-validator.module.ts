import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SbValidatorComponent} from "./sb-validator.component";
import {SbValidateDirective} from "./sb-validate.directive";
import {SbValidateMessageComponent} from './sb-validate-message/sb-validate-message.component';

@NgModule({
    declarations: [SbValidatorComponent, SbValidateDirective, SbValidateMessageComponent],
    exports: [SbValidatorComponent, SbValidateMessageComponent],
    imports: [
        CommonModule
    ]
})
export class SbValidatorModule {
}
