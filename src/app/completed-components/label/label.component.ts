/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, Input } from '@angular/core';
import { config } from '../../config';
import { LabelModel } from './label.model';

@Component({
  selector: `${ config.components.prefix }-label }`,
  templateUrl: './label.component.html'
})
export class LabelComponent implements LabelModel {
  static readonly defaultProps: LabelModel = {
    className: ''
  };

  @Input() className: string = LabelComponent.defaultProps.className;

  public prefix = config.components.prefix;
}
