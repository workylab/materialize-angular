/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICON_SIZES, IconModel } from './icon.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-icon }`,
  templateUrl: './icon.component.html'
})
export class IconComponent implements IconModel {
  static readonly defaultProps: IconModel = {
    className: '',
    size: ICON_SIZES.SM
  };

  @Output('onClick') onClickEmitter: EventEmitter<void>;
  @Output('onBlur') onBlurEmitter: EventEmitter<void>;

  @Input() className: string = IconComponent.defaultProps.className;
  @Input() size: ICON_SIZES = IconComponent.defaultProps.size;

  public prefix = config.components.prefix;

  constructor() {
    this.onClickEmitter = new EventEmitter();
    this.onBlurEmitter = new EventEmitter();
  }

  onClick() {
    this.onClickEmitter.emit();
  }

  onBlur() {
    this.onBlurEmitter.emit();
  }
}
