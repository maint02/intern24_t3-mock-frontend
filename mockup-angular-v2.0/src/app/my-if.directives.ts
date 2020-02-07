import {Directive, Input, ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
import {RoleModel} from './shared/model/employee/role.model';
import {Employee} from "./shared/model/employee/employee.model";

@Directive({
    selector: '[hasAnyRole]'
})
export class MyIfDirective {
    employee: Employee[] = [];
    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {
        console.log('template ref', templateRef);
        console.log('view container', viewContainer);
    }

    // set myIf(role) {
    //     // lay role cua user
    //     // check role
    //     const userRole = user.role;
    //     const isHasRole = role === userRole;
    //     if (isHasRole) {
    //         this.viewContainer.createEmbeddedView(this.templateRef);
    //     } else {
    //         this.viewContainer.clear();
    //     }
    // }

    // @Input()
    // set myIf(role) {
    //
    //     const empRole = this.employee.;
    // }


}
