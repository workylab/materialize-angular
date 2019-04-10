import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[modalClose]'
})
export class CustomModalCloseDirective {
  constructor(public elementRef: ElementRef) {
  }
}
