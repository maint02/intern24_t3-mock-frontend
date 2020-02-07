import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LoginModule} from './core/login/login.module';
import {LoginAltModule} from './core/login_alt/login-alt.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TOASTR_CONFIG} from './core/config/toastr.config';
import {AppConfigService} from './app-config.service';
import { RegisterModule } from './core/register/register.module';
import {EmpMngModule} from './features/employee-manager/emp-mng.module';
import {PaginationModule} from "ngx-bootstrap";

const appInitializer = (appConfig: AppConfigService) => {
    return () => {
        return appConfig.loadAppConfig();
    };
};
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LoginModule,
        LoginAltModule,
        CoreModule,
        EmpMngModule,
        RegisterModule,
        PaginationModule.forRoot(),
        BrowserAnimationsModule,
        ToastrModule.forRoot(TOASTR_CONFIG)
    ],
    providers: [
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AppConfigService]
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
