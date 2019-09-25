/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { config } from '../../config';
import { TextAreaModel } from './textarea.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaComponent)
  }],
  selector: `${ config.components.prefix }-textarea }`,
  templateUrl: './textarea.component.html'
})
export class TextAreaComponent implements ControlValueAccessor, TextAreaModel {
  static readonly defaultProps: TextAreaModel = {
    className: '',
    disabled: false,
    floatLabel: '',
    hasCounter: false,
    id: '',
    maxLength: 500,
    minLength: 0,
    name: '',
    placeholder: '',
    required: false,
    rows: 1,
    value: ''
  };

  @Output('onFocus') onFocusEmitter: EventEmitter<void>;
  @Output('onChange') onChangeEmitter: EventEmitter<string>;
  @Output('onBlur') onBlurEmitter: EventEmitter<void>;

  @Input() className: string = TextAreaComponent.defaultProps.className;
  @Input() disabled: boolean = TextAreaComponent.defaultProps.disabled;
  @Input() floatLabel: string = TextAreaComponent.defaultProps.floatLabel;
  @Input() hasCounter: boolean = TextAreaComponent.defaultProps.hasCounter;
  @Input() id: string = TextAreaComponent.defaultProps.id;
  @Input() maxLength: number = TextAreaComponent.defaultProps.maxLength;
  @Input() minLength: number = TextAreaComponent.defaultProps.minLength;
  @Input() name: string = TextAreaComponent.defaultProps.name;
  @Input() placeholder: string = TextAreaComponent.defaultProps.placeholder;
  @Input() required: boolean = TextAreaComponent.defaultProps.required;
  @Input() rows: number = TextAreaComponent.defaultProps.rows;
  @Input() value: string = TextAreaComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public isFocused: boolean;

  constructor() {
    this.isFocused = false;

    this.onBlurEmitter = new EventEmitter();
    this.onChangeEmitter = new EventEmitter();
    this.onFocusEmitter = new EventEmitter();
  }

  onBlur(): void {
    this.onBlurEmitter.emit();
    this.isFocused = false;
  }

  onFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;
      this.onTouched();
      this.onFocusEmitter.emit();
    }
  }

  onChange(event: any): void {
    const { value } = event.target;

    this.value = value;
    this.onChangeEmitter.emit(event);
    this.onTextAreaChange(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onTextAreaChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onTextAreaChange(value: string): void {}

  onTouched(): void {}
}
