import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[modalHandler]'
})
export class ModalHandlerDirective {
  constructor(public elementRef: ElementRef) {
  }
}
