import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-drawer-handler }`,
  templateUrl: './drawer-handler.component.html'
})
export class DrawerHandlerComponent {
  @Output('onClick') onClickEmitter: EventEmitter<void>;

  constructor(public elementRef: ElementRef) {
    this.onClickEmitter = new EventEmitter();
  }

  @HostListener('click')
  onClick() {
    this.onClickEmitter.emit();
  }
}
