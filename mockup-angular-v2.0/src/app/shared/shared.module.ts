import {NgModule} from '@angular/core';
import {HasAnyAuthorityDirective} from './auth/has-any-authority.directive';
import {BlockSpecialKeyDirective} from './utils/directives/block-special-key.directive';
import {ClickOutsideDirective} from './directives/click-outside.directive';
import {SharedLibsModule} from './shared-libs.module';
import {SbValidatorModule} from './sb-validator/sb-validator.module';
import {PaginationModule} from 'ngx-bootstrap';
@NgModule({
    imports: [
        SharedLibsModule,
        PaginationModule.forRoot(),
    ],
    declarations: [
        HasAnyAuthorityDirective,
        BlockSpecialKeyDirective,
        ClickOutsideDirective
    ],
    exports: [
        SharedLibsModule,
        HasAnyAuthorityDirective,
        BlockSpecialKeyDirective,
        ClickOutsideDirective,
        SbValidatorModule,
        PaginationModule,
    ]
})
export class SharedModule {
}
