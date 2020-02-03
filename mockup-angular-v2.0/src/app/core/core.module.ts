import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {environment} from 'src/environments/environment';
import {effects, metaReducers, reducers} from '../store';
import {CustomSerializer} from '../store/router';
import {DialogsModule} from '../shared/dialogs/dialogs.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PopoverModule} from 'ngx-bootstrap';
import {NgxWebstorageModule} from "ngx-webstorage";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {AuthExpiredInterceptor} from "./interceptor/auth-expired.interceptor";
import {ErrorHandlerInterceptor} from "./interceptor/errorhandler.interceptor";
import {NotificationInterceptor} from "./interceptor/notification.interceptor";

/**
 * Module for global imports
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot({prefix: 'hrsb', separator: '-'}),
        // ngrx modules
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false,
                strictStateSerializability: false,
                strictActionSerializability: false,
            },
        }),
        EffectsModule.forRoot([...effects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, logOnly: environment.production,
            actionsBlocklist: ['@ngrx/router*']
        }),
        StoreRouterConnectingModule.forRoot(),
        // import ngx-bootstrap services here
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        BsDropdownModule.forRoot(),
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        PopoverModule.forRoot(),
        DialogsModule
    ],
    providers: [
        // use custom serializer to strip redundant router data
        {provide: RouterStateSerializer, useClass: CustomSerializer},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {
    // thi module can be load only once
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`);
    }
}
