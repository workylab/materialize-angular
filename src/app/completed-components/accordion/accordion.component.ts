/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { AccordionModel } from './accordion.model';
import { CollapsibleComponent } from '../collapsible/collapsible.component';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-accordion }`,
  templateUrl: './accordion.component.html'
})
export class AccordionComponent implements AccordionModel, AfterContentInit {
  static readonly defaultProps: AccordionModel = {
    activeIndex: null,
    className: ''
  };

  @ContentChildren(CollapsibleComponent) collapsiblesQueryList: QueryList<CollapsibleComponent>;

  @Output('onToggle') onToggleEmitter: EventEmitter<number | null>;

  @Input() className: string = AccordionComponent.defaultProps.className;

  public activeIndex: number | null;

  constructor() {
    this.activeIndex = AccordionComponent.defaultProps.activeIndex;

    this.initCollapsibles = this.initCollapsibles.bind(this);
    this.registerCollapsibles = this.registerCollapsibles.bind(this);

    this.onToggleEmitter = new EventEmitter();
  }

  ngAfterContentInit() {
    this.initCollapsibles();

    this.collapsiblesQueryList.changes.subscribe(this.initCollapsibles);
  }

  initCollapsibles() {
    setTimeout(this.registerCollapsibles, 0);
  }

  registerCollapsibles() {
    this.collapsiblesQueryList.forEach((item, index) => {
      item.onOpenEmitter.subscribe(() => {
        this.toggleCollapsibles(index);
      });
    });
  }

  toggleCollapsibles(currentIndex: number | null) {
    this.activeIndex = currentIndex;

    this.onToggleEmitter.emit(this.activeIndex);

    this.collapsiblesQueryList.forEach((item, index) => {
      if (index === currentIndex) {
        item.open();
      } else {
        item.close();
      }
    });
  }

  showNext() {
    const nextIndex = this.activeIndex === null || this.activeIndex >= this.collapsiblesQueryList.length
      ? null
      : this.activeIndex + 1;

    this.toggleCollapsibles(nextIndex);
  }

  showPrev() {
    const prevIndex = this.activeIndex === null || this.activeIndex === 0
      ? null
      : this.activeIndex - 1;

    this.toggleCollapsibles(prevIndex);
  }
}
