import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'materialize-modal-handler',
  templateUrl: './modal-handler.component.html'
})
export class ModalHandlerComponent {
  constructor(public elementRef: ElementRef) {
  }
}
