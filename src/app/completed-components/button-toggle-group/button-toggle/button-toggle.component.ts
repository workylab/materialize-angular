/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonToggleModel } from './button-toggle.model';
import { config } from '../../../config';

@Component({
  selector: `${ config.components.prefix }-button-toggle }`,
  templateUrl: './button-toggle.component.html'
})
export class ButtonToggleComponent implements ButtonToggleModel {
  static readonly defaultProps: ButtonToggleModel = {
    className: '',
    disabled: false,
    name: '',
    value: ''
  };

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input() className: string = ButtonToggleComponent.defaultProps.className;
  @Input() disabled: boolean = ButtonToggleComponent.defaultProps.disabled;
  @Input() name: string = ButtonToggleComponent.defaultProps.name;
  @Input() value: string = ButtonToggleComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public isActive: boolean;
  public isFocused: boolean;

  constructor() {
    this.onClickEmitter = new EventEmitter<string>();

    this.isActive = false;
    this.isFocused = false;
  }

  onClick() {
    if (!this.disabled) {
      this.isActive = !this.isActive;
      this.isFocused = false;
      this.onClickEmitter.emit(this.value);
    }
  }

  onBlur() {
    this.isFocused = false;
  }

  onFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }
}
