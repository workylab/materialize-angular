/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModel } from './checkbox.model';
import { config } from '../../config';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent)
  }],
  selector: `${ config.components.prefix }-checkbox }`,
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent implements ControlValueAccessor, CheckboxModel {
  static readonly defaultProps: CheckboxModel = {
    className: '',
    disabled: false,
    id: null,
    indeterminate: false,
    name: '',
    required: false,
    value: false
  };

  @Input() className: string = CheckboxComponent.defaultProps.className;
  @Input() disabled: boolean = CheckboxComponent.defaultProps.disabled;
  @Input() id: string | null = CheckboxComponent.defaultProps.id;
  @Input() indeterminate: boolean = CheckboxComponent.defaultProps.indeterminate;
  @Input() name: string = CheckboxComponent.defaultProps.name;
  @Input() required: boolean = CheckboxComponent.defaultProps.required;
  @Input() value: boolean = CheckboxComponent.defaultProps.value;

  @Output('onChange') onChangeEmitter: EventEmitter<boolean>;

  public prefix = config.components.prefix;

  public isFocused: boolean;

  constructor() {
    this.isFocused = false;

    this.onChangeEmitter = new EventEmitter();
  }

  toggleValue(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.isFocused = false;

      this.onChange(this.value);
      this.onChangeEmitter.emit(this.value);
    }
  }

  onFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;

      this.onTouched();
    }
  }

  onBlur(): void {
    this.isFocused = false;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: boolean): void {}

  onTouched(): void {}
}

