/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, Input } from '@angular/core';
import { CardModel } from './card.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-card }`,
  templateUrl: './card.component.html'
})
export class CardComponent implements CardModel {
  static readonly defaultProps: CardModel = { className: ''};

  @Input() className: string = CardComponent.defaultProps.className;

  public prefix = config.components.prefix;
}
