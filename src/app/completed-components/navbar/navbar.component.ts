/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, Input } from '@angular/core';
import { config } from '../../config';
import { NavbarModel } from './navbar.model';

@Component({
  selector: `${ config.components.prefix }-navbar }`,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements NavbarModel {
  static readonly defaultProps: NavbarModel = {
    className: ''
  };

  @Input() className: string = NavbarComponent.defaultProps.className;

  public prefix = config.components.prefix;
}
