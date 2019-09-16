import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { config } from '../../config';
import { getOffseTop } from '../../utils/get-offset-top.util';
import { ScrollSpyItemComponent } from './scroll-spy-item/scroll-spy-item.component';
import { ScrollSpyModel } from './scroll-spy.model';
import { windowScrollPosition } from '../../utils/window-scroll-position.util';

@Component({
  selector: `${ config.components.prefix }-scroll-spy`,
  templateUrl: './scroll-spy.component.html'
})
export class ScrollSpyComponent implements ScrollSpyModel, AfterContentInit {
  static readonly defaultProps: ScrollSpyModel = {
    className: '',
    itemId: ''
  };

  @ContentChildren(ScrollSpyItemComponent) items: QueryList<ScrollSpyItemComponent>;

  @Output('onChange') onChangeEmitter: EventEmitter<string>;

  @Input() className: string = ScrollSpyComponent.defaultProps.className;
  @Input() itemId: string = ScrollSpyComponent.defaultProps.itemId;

  constructor() {
    this.onChangeEmitter = new EventEmitter<string>();

    this.onScroll = this.onScroll.bind(this);
    this.validateScroll = this.validateScroll.bind(this);

    window.addEventListener('scroll', this.onScroll);
  }

  ngAfterContentInit() {
    this.onScroll();
  }

  onScroll() {
    setTimeout(this.validateScroll, 100);
  }

  validateScroll() {
    const item = this.getCurrentItem();

    if (this.itemId !== item.id) {
      this.itemId = item.id;
      this.onChangeEmitter.emit(this.itemId);
    }
  }

  getCurrentItem(): ScrollSpyItemComponent {
    const items = this.items.toArray();

    for (let i = 0; i < items.length; i++) {
      const elementOffsetTop = getOffseTop(items[i].element.nativeElement);

      if (elementOffsetTop > windowScrollPosition()) {
        const prevItem = items[i - 1]
          ? items[i - 1]
          : items[0];

        return prevItem;
      }
    }

    return items[items.length - 1];
  }
}
