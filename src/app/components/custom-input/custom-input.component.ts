import { Component, Input, OnInit } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

const fieldValidation = require('../../fixtures/field-validations.json');

interface defaultProps {
  className: string;
  disabled: boolean;
  floatLabel: boolean;
  iconName: string;
  isFocused: boolean;
  isTouched: boolean;
  label: string;
  maxLength: number;
  placeholder: string;
  required: boolean;
  type: string;
  value: string;
}

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html'
})
export class CustomInputComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    className: 'input-control',
    disabled: false,
    floatLabel: true,
    iconName: '',
    isFocused: false,
    isTouched: false,
    label: '',
    maxLength: 500,
    placeholder: '',
    required: false,
    type: 'text',
    value: ''
  };

  @Input() onBlur: (value: string) => void;
  @Input() onChange: (value: string) => void;

  @Input() className: string;
  @Input() disabled: boolean;
  @Input() errorMessage: string;
  @Input() floatLabel: boolean;
  @Input() iconName: string;
  @Input() label: string;
  @Input() maxLength: number;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() type: 'text' | 'password';
  @Input() value: string;

  public _className: string;
  public _disabled: boolean;
  public _floatLabel: boolean;
  public _iconName: string;
  public _isTouched: boolean;
  public _isFocused: boolean;
  public _isValid: boolean;
  public _label: string;
  public _maxLength: number;
  public _placeholder: string;
  public _required: boolean;
  public _type: string;
  public _value: string;

  constructor() {
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues(): void {
    // this.errorMessage = InputValidations[this.type].errorMsg;
    const { defaultProps } = CustomInputComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = getBooleanValue(this.disabled, defaultProps.disabled);
    this._floatLabel = getBooleanValue(this.floatLabel, defaultProps.floatLabel);
    this._label = this.label || defaultProps.label;
    this._iconName = this.iconName || defaultProps.iconName;
    this._maxLength = this.maxLength || defaultProps.maxLength;
    this._placeholder = this.placeholder || defaultProps.placeholder;
    this._required = getBooleanValue(this.required, defaultProps.required);
    this._type = this.type || defaultProps.type;
    this._value = this.value || defaultProps.value;

    this._isValid = this.validate(this._value, this._required);
    this._isFocused = defaultProps.isFocused;
    this._isTouched = defaultProps.isTouched;
  }

  validate(value: string, required: boolean): boolean {
    if (!required || (required && this.isValidRegex(value))) {
      return true;
    }

    return false;
  }

  isValidRegex(value: string): boolean {
    const { regex } = fieldValidation[this.type];
    const customRegex = new RegExp(regex);

    return customRegex.test(value);
  }

  onInputBlur(event: any): void {
    const { value } = event.target;

    this._isTouched = true;
    this._isFocused = false;

    if (this.onBlur) {
      this.onBlur(value);
    }
  }

  onInputFocus() {
    this._isFocused = true;
  }

  onInputChange(event: any): void {
    const { value } = event.target;

    this._isValid = this.validate(value, this.required);
    this._value = value;

    if (this.onChange) {
      this.onChange(value);
    }
  }
}
