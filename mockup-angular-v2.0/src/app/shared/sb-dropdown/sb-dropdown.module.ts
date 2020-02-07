import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SbDropdownTreeComponent} from "./sb-dropdown-tree/sb-dropdown-tree.component";
import {PopupModule} from "@progress/kendo-angular-popup";
import {TreeViewModule} from "@progress/kendo-angular-treeview";
import {ClickOutsideDirective} from "./directives/click-outside.directive";

@NgModule({
    declarations: [SbDropdownTreeComponent, ClickOutsideDirective],
    imports: [
        CommonModule,
        PopupModule,
        TreeViewModule,
    ],
    exports: [SbDropdownTreeComponent]
})
export class SbDropdownModule {
}
