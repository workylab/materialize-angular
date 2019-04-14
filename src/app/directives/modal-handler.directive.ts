import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[modalHandler]'
})
export class CustomModalHandlerDirective {
  constructor(public elementRef: ElementRef) {
  }
}
