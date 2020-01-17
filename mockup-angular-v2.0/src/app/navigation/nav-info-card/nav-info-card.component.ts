import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {toggleFilter} from 'src/app/store/navigation';
import {APP_CONFIG} from 'src/app/app.config';
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../shared/model/user/account.model";

@Component({
    selector: 'smart-nav-info-card',
    templateUrl: './nav-info-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavInfoCardComponent implements OnInit {

    avatar = APP_CONFIG.avatar;
    account: Account;

    constructor(
        private store: Store<any>,
        private accountService: AccountService,
    ) {
    }

    ngOnInit(): void {
        this.accountService.identity().subscribe(
            acc => this.account = acc
        );
    }

    toggleFilter($event: MouseEvent) {
        $event.preventDefault();
        this.store.dispatch(toggleFilter());
    }
}
