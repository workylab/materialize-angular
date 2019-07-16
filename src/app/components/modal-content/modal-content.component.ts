import { Component, ContentChildren, QueryList } from '@angular/core';
import { config } from '../../config';
import { ModalCloseDirective } from '../../directives/modal-close.directive';

@Component({
  selector: `${ config.components.prefix }-modal-content }`,
  templateUrl: './modal-content.component.html'
})
export class ModalContentComponent {
  @ContentChildren(ModalCloseDirective) closeItems: QueryList<ModalCloseDirective>;
}
