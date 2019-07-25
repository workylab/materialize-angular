import { Component, HostListener, Input } from '@angular/core';
import { config } from '../../config';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: `${ config.components.prefix }-modal-handler }`,
  templateUrl: './modal-handler.component.html'
})
export class ModalHandlerComponent {
  @Input() modal: ModalComponent;

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (this.modal) {
      this.modal.open();
    }
  }
}
