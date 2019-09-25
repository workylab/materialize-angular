/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { BUTTON_LEVELS, BUTTON_TYPES, ButtonModel } from './button.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-button }`,
  templateUrl: './button.component.html'
})
export class ButtonComponent implements ButtonModel {
  static readonly defaultProps: ButtonModel = {
    className: '',
    disabled: false,
    level: BUTTON_LEVELS.ACCENT,
    rippleDuration: 250,
    type: BUTTON_TYPES.BUTTON
  };

  @Input() className: string = ButtonComponent.defaultProps.className;
  @Input() disabled: boolean = ButtonComponent.defaultProps.disabled;
  @Input() level: BUTTON_LEVELS = ButtonComponent.defaultProps.level;
  @Input() rippleDuration: number = ButtonComponent.defaultProps.rippleDuration;
  @Input() type: BUTTON_TYPES = ButtonComponent.defaultProps.type;

  @Output('onBlur') onBlurEmitter: EventEmitter<void>;
  @Output('onClick') onClickEmitter: EventEmitter<void>;

  public prefix = config.components.prefix;
  public isFocused: boolean;

  constructor() {
    this.isFocused = false;

    this.onBlurEmitter = new EventEmitter();
    this.onClickEmitter = new EventEmitter();
  }

  onFocus() {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }

  onClick() {
    if (!this.disabled) {
      this.isFocused = false;
      this.onClickEmitter.emit();
    }
  }

  onBlur() {
    this.onBlurEmitter.emit();

    this.isFocused = false;
  }
}
