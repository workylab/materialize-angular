import { Component, Input, OnInit } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

interface defaultProps {
  className: string;
  disabled: boolean;
  floatLabel: boolean;
  iconName: string;
  isFocused: boolean;
  isTouched: boolean;
  label: string;
  maxLength: number;
  minLength: number;
  placeholder: string;
  required: boolean;
  value: string;
}

@Component({
  selector: 'custom-textarea',
  templateUrl: './custom-textarea.component.html'
})
export class CustomTextAreaComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    className: 'input-control',
    disabled: false,
    floatLabel: true,
    iconName: '',
    isFocused: false,
    isTouched: false,
    label: '',
    maxLength: 500,
    minLength: 5,
    placeholder: '',
    required: false,
    value: ''
  };

  @Input() className: string;
  @Input() disabled: boolean;
  @Input() floatLabel: boolean;
  @Input() iconName: string;
  @Input() label: string;
  @Input() required: boolean;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() placeholder: string;
  @Input() value: string;

  public _className: string;
  public _disabled: boolean;
  public _floatLabel: boolean;
  public _iconName: string;
  public _isFocused: boolean;
  public _isTouched: boolean;
  public _isValid: boolean;
  public _label: string;
  public _minLength: number;
  public _maxLength: number;
  public _placeholder: string;
  public _required: boolean;
  public _value: string;

  constructor() {
    this.onTextAreaBlur = this.onTextAreaBlur.bind(this);
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomTextAreaComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = this.disabled || defaultProps.disabled;
    this._floatLabel = getBooleanValue(this.floatLabel, defaultProps.floatLabel);
    this._iconName = this.iconName || defaultProps.iconName;
    this._label = this.label || defaultProps.label;
    this._maxLength = this.maxLength || defaultProps.maxLength;
    this._minLength = this.minLength || defaultProps.minLength;
    this._placeholder = this.placeholder || defaultProps.placeholder;
    this._value = this.value || defaultProps.value;

    this._isFocused = defaultProps.isFocused;
    this._isTouched = defaultProps.isTouched;
    this._isValid = this.validate(this._value);
  }

  onTextAreaBlur(): void {
    this._isFocused = false;
    this._isTouched = true;
  }

  onTextAreaFocus() {
    this._isFocused = true;
  }

  onTextAreaChange(event: any): void {
    const { value } = event.target;

    this._isValid = this.validate(value);
    this._value = value;
  }

  validate(value: string): boolean {
    const size = value
      ? value.length
      : 0;

    if (!this._required) {
      return true;
    }

    if (size >= this._minLength && size <= this._maxLength) {
      return true;
    }

    return false;
  }
}
