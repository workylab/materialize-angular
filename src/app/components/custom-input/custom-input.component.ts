import { Component, Input, OnInit } from '@angular/core';

const fieldValidation = require('../../fixtures/field-validations.json');

@Component({
  selector: 'custom-input',
  styleUrls: ['./custom-input.component.scss'],
  templateUrl: './custom-input.component.html'
})
export class CustomInput implements OnInit {
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

  private _className: string;
  private _disabled: boolean;
  private _isTouched: boolean;
  private _isValid: boolean;
  private _label: string;
  private _maxLength: number;
  private _placeholder: string;
  private _required: boolean;
  private _type: string;
  private _value: string;

  constructor() {
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    // this.errorMessage = InputValidations[this.type].errorMsg;
    const {
      className,
      disabled,
      label,
      maxLength,
      placeholder,
      required,
      type,
      value
    } = CustomInput.defaultProps;

    this._className = this.className || className;
    this._disabled = this.disable || disabled;
    this._label = this.label || label;
    this._maxLength = this.maxLength || maxLength;
    this._placeholder = this.placeholder || placeholder;
    this._required = this.required || required;
    this._type = this.type || type;
    this._value = this.value || value;

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
