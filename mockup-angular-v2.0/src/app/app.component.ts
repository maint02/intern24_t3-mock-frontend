import {Component} from '@angular/core';
import {Account} from './shared/model/user/account.model';
import {Router} from '@angular/router';
import {AuthServerProvider} from './core/auth/auth-jwt.service';

@Component({
  selector: 'smart-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'Smart-Office';
    currentEmployee: Account ;

    constructor(
        private router: Router,
        private authServerProvider: AuthServerProvider,
    ) {
    }
}
