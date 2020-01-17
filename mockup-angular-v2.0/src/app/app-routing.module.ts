import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {LayoutModule} from './layout/layout.module';
import {errorRoute} from './layout/error/error.route';
import {UserRouteAccessService} from './core/auth/user-route-access-service';
import {ActiveAccountComponent} from './core/active-account/active-account.component';
import {RegisterComponent} from './core/register/register.component';
import {LoginComponent} from './core/login/login.component';

const routes: Routes = [

    {
        path: '',
        component: MainComponent,
        children: [
            {path: '', redirectTo: 'quan-ly-tham-so', pathMatch: 'full'},
            {path: 'intel', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)},
            {path: 'info', loadChildren: () => import('./features/info/info.module').then(m => m.InfoModule)},
            {
                path: 'examples',
                loadChildren: () => import('./examples/examples.module').then(m => m.ExamplesModule),
                canActivate: [UserRouteAccessService],
                data: {
                    authorities: ['ROLE_HR']
                }
            },
            {
                // path: 'quan-ly-z',
                // loadChildren: () => import('./features/quan-ly-user/user-mng.module').then(m => m.UserMngModule),
                // canActivate: [UserRouteAccessService],
                // data: {
                //     authorities: ['ROLE_HR']
                // }
            }

        ]
    },
    // {
    //     path: '',
    //     component: ,
    // },
    {
        path: 'active-account',
        component: ActiveAccountComponent,
        loadChildren: () => import('./core/active-account/active-account.module').then(m => m.ActiveAccountModule),
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_HR']
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        loadChildren: () => import('./core/register/register.module').then(m => m.RegisterModule),
    },
    {
        path: 'login',
        component: LoginComponent,
        loadChildren: () => import('./core/login/login.module').then(m => m.LoginModule),
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_HR', 'ROLE_LEADER', 'ROLE_MANAGER', 'ROLE_MEMBER']
        }
    },
    {
        path: 'login-alt',
        loadChildren: () => import('./core/login_alt/login-alt.module').then(m => m.LoginAltModule),
    },
    ...errorRoute
];

@NgModule({
    imports: [LayoutModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
