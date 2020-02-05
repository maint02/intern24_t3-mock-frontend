import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {LayoutModule} from './layout/layout.module';
import {errorRoute} from './layout/error/error.route';
import {UserRouteAccessService} from './core/auth/user-route-access-service';
import {RegisterComponent} from './core/register/register.component';
import {HomeComponent} from "./core/home/home.component";
import {LoginComponent} from "./core/login/login.component";
import {LoginAltComponent} from "./core/login_alt/login-alt.component";

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
                    authorities: ['ROLE_ADMIN']
                }
            },
            {
                path: 'quan-ly-user',
                loadChildren: () => import('./features/quan-ly-user/user-mng.module').then(m => m.UserMngModule),
                // canActivate: [UserRouteAccessService],
                // data: {
                //     authorities: ['ROLE_ADMIN']
                // }
            },
            {
                path: 'employee-manager',
                loadChildren: () => import('./features/employee-manager/emp-mng.module').then(m => m.EmpMngModule),
                // canActivate:[UserRouteAccessService],
                // data:{
                //     authorities: ['ROLE_ADMIN']
                // }
            },

        ]
    },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    //     loadChildren: () => import('./core/home/home.module').then(m => m.HomeModule),
    // },
    {
        path: 'register',
        component: RegisterComponent,
        loadChildren: () => import('./core/register/register.module').then(m => m.RegisterModule),
    },
    {
        path: 'login',
        component: LoginComponent,
        loadChildren: () => import('./core/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'login-alt',
        component: LoginAltComponent,
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
