import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[materializeModalClose]'
})
export class ModalCloseDirective {
  @Output('onClick') onClickEmitter: EventEmitter<void>;

  constructor() {
    this.onClickEmitter = new EventEmitter();
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    this.onClickEmitter.emit();
  }
}
