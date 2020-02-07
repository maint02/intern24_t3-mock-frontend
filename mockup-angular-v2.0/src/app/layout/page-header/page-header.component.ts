import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {mobileNavigation} from 'src/app/store/navigation';
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../shared/model/user/account.model";

@Component({
    selector: 'smart-page-header',
    templateUrl: './page-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent implements OnInit {

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

    openMobileNav($event: MouseEvent) {
        $event.preventDefault();
        this.store.dispatch(mobileNavigation({open: true}));
    }
}
