import { Component, Input, OnInit } from '@angular/core';

const fieldValidation = require('../../fixtures/field-validations.json');

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html'
})
export class CustomInputComponent implements OnInit {
  static readonly defaultProps = {
    className: 'form-control',
    disabled: false,
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
  @Input() disable: boolean;
  @Input() errorMessage: string;
  @Input() label: string;
  @Input() maxLength: number;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() type: string;
  @Input() value: string;

  public _className: string;
  public _disabled: boolean;
  public _isTouched: boolean;
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

  initValues() {
    // this.errorMessage = InputValidations[this.type].errorMsg;
    const { defaultProps } = CustomInputComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = this.disable || defaultProps.disabled;
    this._label = this.label || defaultProps.label;
    this._maxLength = this.maxLength || defaultProps.maxLength;
    this._placeholder = this.placeholder || defaultProps.placeholder;
    this._required = this.required || defaultProps.required;
    this._type = this.type || defaultProps.type;
    this._value = this.value || defaultProps.value;

    this._isValid = this.validate(this._value, this._required);
    this._isTouched = false;
  }

  validate(value: string, required: boolean) {
    if (!required || (required && this.isValidRegex(value))) {
      return true;
    }

    return false;
  }

  isValidRegex(value: string) {
    const { regex } = fieldValidation[this.type];
    const customRegex = new RegExp(regex);

    return customRegex.test(value);
  }

  onInputBlur(event: any) {
    const { value } = event.target;

    this._isTouched = true;

    if (this.onBlur) {
      this.onBlur(value);
    }
  }

  onInputChange(event: any) {
    const { value } = event.target;

    this._isValid = this.validate(value, this.required);
    this._value = value;

    if (this.onChange) {
      this.onChange(value);
    }
  }
}
