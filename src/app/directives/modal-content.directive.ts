import { ContentChildren, Directive, QueryList } from '@angular/core';
import { CustomModalCloseDirective } from './modal-close.directive';

@Directive({
  selector: '[modalContent]'
})
export class CustomModalContentDirective {
  @ContentChildren(CustomModalCloseDirective) closeItems: QueryList<CustomModalCloseDirective>;
}
