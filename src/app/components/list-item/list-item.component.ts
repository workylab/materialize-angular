/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { config } from '../../config';
import { ListItemModel } from './list-item.model';
import { Router } from '@angular/router';

@Component({
  selector: `${ config.components.prefix }-list-item }`,
  templateUrl: './list-item.component.html'
})
export class ListItemComponent {
  static readonly defaultProps: ListItemModel = {
    className: '',
    link: [],
    transitionDuration: 250
  };

  @Output('onClick') onClickEmitter: EventEmitter<void>;

  @Input() className: string = ListItemComponent.defaultProps.className;
  @Input() link: Array<string> = ListItemComponent.defaultProps.link;
  @Input() transitionDuration: number = ListItemComponent.defaultProps.transitionDuration;

  public isActive: boolean;

  constructor(private router: Router) {
    this.isActive = false;

    this.onClickEmitter = new EventEmitter();
  }

  onClick() {
    setTimeout(() => {
      this.isActive = true;
      this.onClickEmitter.emit();

      if (this.link.length) {
        this.router.navigate(this.link);
      }
    }, this.transitionDuration / 2);
  }
}
