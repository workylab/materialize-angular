/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { config } from '../../../config';
import { RadioModel } from './radio.model';

@Component({
  selector: `${ config.components.prefix }-radio }`,
  templateUrl: './radio.component.html'
})
export class RadioComponent implements RadioModel {
  static readonly defaultProps: RadioModel = {
    className: '',
    disabled: false,
    id: null,
    name: '',
    required: false,
    value: ''
  };

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input() className: string = RadioComponent.defaultProps.className;
  @Input() disabled: boolean = RadioComponent.defaultProps.disabled;
  @Input() id: string | null = RadioComponent.defaultProps.id;
  @Input() name: string = RadioComponent.defaultProps.name;
  @Input() required: boolean = RadioComponent.defaultProps.required;
  @Input() value: string = RadioComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public isActive: boolean;
  public isFocused: boolean;

  constructor() {
    this.isActive = false;
    this.isFocused = false;

    this.onClickEmitter = new EventEmitter();
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
