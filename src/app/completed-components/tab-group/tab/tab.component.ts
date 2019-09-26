/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, Input } from '@angular/core';
import { config } from '../../../config';
import { TabModel } from './tab.model';

@Component({
  selector: `${ config.components.prefix }-tab }`,
  templateUrl: './tab.component.html'
})
export class TabComponent implements TabModel {
  static readonly defaultProps: TabModel = {
    className: '',
    disabled: false,
    link: '',
    title: ''
  };

  @Input() className: string = TabComponent.defaultProps.className;
  @Input() disabled: boolean = TabComponent.defaultProps.disabled;
  @Input() link: string = TabComponent.defaultProps.link;
  @Input() title: string = TabComponent.defaultProps.title;

  public isActive: boolean;

  constructor() {
    this.isActive = false;
  }
}
