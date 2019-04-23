import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[modalClose]'
})
export class ModalCloseDirective {
  constructor(public elementRef: ElementRef) {
  }
}
