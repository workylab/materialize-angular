import { Component, ContentChildren, QueryList } from '@angular/core';
import { ModalCloseDirective } from '../../directives/modal-close.directive';

@Component({
  selector: 'materialize-modal-content',
  templateUrl: './modal-content.component.html'
})
export class ModalContentComponent {
  @ContentChildren(ModalCloseDirective) closeItems: QueryList<ModalCloseDirective>;
}
