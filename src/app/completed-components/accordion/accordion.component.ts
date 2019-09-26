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
    activeIndex: 0,
    className: ''
  };

  @ContentChildren(CollapsibleComponent) collapsibles: QueryList<CollapsibleComponent>;

  @Output('onToggle') onToggleEmitter: EventEmitter<number | null>;

  @Input() className: string = AccordionComponent.defaultProps.className;

  public activeIndex: number;

  constructor() {
    this.onToggleEmitter = new EventEmitter();

    this.activeIndex = AccordionComponent.defaultProps.activeIndex;
  }

  ngAfterContentInit() {
    this.collapsibles.forEach((item, index) => {
      item.onOpenEmitter.subscribe(() => {
        this.toggleCollapsibles(index);
      });
    });
  }

  toggleCollapsibles(currentIndex: number) {
    this.activeIndex = currentIndex;

    this.onToggleEmitter.emit(this.activeIndex);

    this.collapsibles.forEach((item, index) => {
      if (index === currentIndex) {
        item.open();
      } else {
        item.close();
      }
    });
  }

  showNext() {
    const nextIndex = this.activeIndex + 1;

    this.toggleCollapsibles(nextIndex);
  }

  showPrev() {
    const prevIndex = this.activeIndex - 1;

    this.toggleCollapsibles(prevIndex);
  }
}
