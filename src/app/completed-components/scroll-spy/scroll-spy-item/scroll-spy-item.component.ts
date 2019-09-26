/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, ElementRef, Input } from '@angular/core';
import { config } from '../../../config';
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
}
