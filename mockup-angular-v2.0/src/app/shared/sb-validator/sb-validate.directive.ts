import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[sbValidate]'
})
export class SbValidateDirective {

  constructor(
      public viewContainerRef: ViewContainerRef
  ) { }

}
