import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INPUT_TYPE, InputModel } from './input.model';
import { config } from '../../config';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent)
  }],
  selector: `${ config.components.prefix }-input }`,
  templateUrl: './input.component.html'
})
export class InputComponent implements ControlValueAccessor, InputModel {
  static readonly defaultProps: InputModel = {
    autocomplete: 'none',
    className: '',
    disabled: false,
    floatLabel: '',
    hasCounter: false,
    id: null,
    maxLength: 500,
    name: '',
    placeholder: '',
    required: false,
    type: INPUT_TYPE.TEXT,
    value: ''
  };

  @Output() onFocusEmitter: EventEmitter<void>;
  @Output() onChangeEmitter: EventEmitter<string>;
  @Output() onBlurEmitter: EventEmitter<void>;

  @Input() autocomplete: string = InputComponent.defaultProps.autocomplete;
  @Input() className: string = InputComponent.defaultProps.className;
  @Input() disabled: boolean = InputComponent.defaultProps.disabled;
  @Input() floatLabel: string = InputComponent.defaultProps.floatLabel;
  @Input() hasCounter: boolean = InputComponent.defaultProps.hasCounter;
  @Input() id: string | null = InputComponent.defaultProps.id;
  @Input() maxLength: number = InputComponent.defaultProps.maxLength;
  @Input() name: string = InputComponent.defaultProps.name;
  @Input() placeholder: string = InputComponent.defaultProps.placeholder;
  @Input() required: boolean = InputComponent.defaultProps.required;
  @Input() type: INPUT_TYPE = InputComponent.defaultProps.type;
  @Input() value: string = InputComponent.defaultProps.value;

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
      this.onFocusEmitter.emit();

      this.onTouched();
    }
  }

  onChange(event: any): void {
    const { value } = event.target;

    this.value = value;
    this.onChangeEmitter.emit(this.value);
    this.onInputChange(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onInputChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(value: string): void {}

  onTouched(): void {}
}
