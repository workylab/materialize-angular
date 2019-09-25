/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { config } from '../../config';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListModel } from './list.model';

@Component({
  selector: `${ config.components.prefix }-list }`,
  templateUrl: './list.component.html'
})
export class ListComponent implements AfterContentInit {
  static readonly defaultProps: ListModel = {
    className: ''
  };

  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;

  @Input() className: string = ListComponent.defaultProps.className;

  constructor() {
    this.loadItems = this.loadItems.bind(this);
  }

  ngAfterContentInit() {
    setTimeout(this.loadItems, 0);

    this.items.changes.subscribe(this.loadItems);
  }

  loadItems() {
    this.items.forEach((item, index) => {
      item.onClickEmitter.subscribe(() => {
        this.onItemClick(index);
      });
    });
  }

  onItemClick(currentIndex: number) {
    this.items.forEach((item, index) => {
      item.isActive = (currentIndex === index);
    });
  }
}
