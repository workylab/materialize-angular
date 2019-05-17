import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[materializeModalHandler]'
})
export class ModalHandlerDirective {
  constructor(public elementRef: ElementRef) {
  }
}
