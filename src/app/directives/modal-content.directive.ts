import { ContentChildren, Directive, QueryList } from '@angular/core';
import { ModalCloseDirective } from './modal-close.directive';

@Directive({
  selector: '[materializeModalContent]'
})
export class ModalContentDirective {
  @ContentChildren(ModalCloseDirective) closeItems: QueryList<ModalCloseDirective>;
}
