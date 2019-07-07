import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[materializeDrawerClose]'
})
export class DrawerCloseDirective {
  constructor(public elementRef: ElementRef) {
  }
}
