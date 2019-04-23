import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[materializeModalClose]'
})
export class ModalCloseDirective {
  constructor(public elementRef: ElementRef) {
  }
}
