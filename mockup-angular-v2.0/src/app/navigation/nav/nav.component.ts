import {ChangeDetectionStrategy, Component} from '@angular/core';
import {createSelector, Store} from '@ngrx/store';
import {NavigationItem, selectNavigationItems} from 'src/app/store/navigation';
import {selectSettingsState} from 'src/app/store/settings';

@Component({
    selector: 'smart-nav',
    templateUrl: './nav.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {

    vm$ = this.store.select(
        createSelector(
            selectNavigationItems,
            selectSettingsState,
            (items, settings) => ({items, minified: settings.minifyNavigation})
        )
    );

    constructor(private store: Store<any>) {
    }

    trackByFn(idx: number, item: NavigationItem) {
        return item.title + '_' + idx;
    }
}
