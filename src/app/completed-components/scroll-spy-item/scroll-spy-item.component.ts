import { Component, ElementRef, Input } from '@angular/core';
import { config } from '../../config';
import { ScrollSpyItemModel } from './scroll-spy-item.model';

@Component({
  selector: `${ config.components.prefix }-scroll-spy-item`,
  templateUrl: './scroll-spy-item.component.html'
})
export class ScrollSpyItemComponent implements ScrollSpyItemModel {
  static readonly defaultProps: ScrollSpyItemModel = {
    className: '',
    id: ''
  };

  @Input() className: string = ScrollSpyItemComponent.defaultProps.className;
  @Input() id: string = ScrollSpyItemComponent.defaultProps.id;

  constructor(public element: ElementRef) {
  }

  getElementOffseTop() {
    let offsetTop = 0;
    let nextElement = this.element.nativeElement;

    while (nextElement.offsetParent) {
      if (!isNaN(nextElement.offsetTop)) {
        offsetTop += nextElement.offsetTop;
      }

      nextElement = nextElement.offsetParent;
    }

    return offsetTop;
  }
}
