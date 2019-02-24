import { Component, Input, OnInit } from '@angular/core';
import { CustomRadioOption } from './custom.radio.model';
import { generateUid } from '../../utils/generate-uid.util';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

interface defaultProps {
  className: string;
  disabled: boolean;
  label: string;
  options: Array<CustomRadioOption>;
  required: boolean;
  value: string;
}

@Component({
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html'
})
export class CustomRadioComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    className: 'form-control',
    disabled: false,
    label: '',
    options: [],
    required: false,
    value: null
  };

  @Input() onBlur: () => void;
  @Input() onChange: (selectedOption: CustomRadioOption) => void;

  @Input() className: string;
  @Input() disabled: boolean;
  @Input() id: string;
  @Input() label: string;
  @Input() name: string;
  @Input() options: Array<CustomRadioOption>;
  @Input() required: boolean;
  @Input() value: string;

  public _className: string;
  public _disabled: boolean;
  public _id: string;
  public _label: string;
  public _name: string;
  public _isTouched: boolean;
  public _isValid: boolean;
  public _options: Array<CustomRadioOption>;
  public _required: boolean;
  public _value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomRadioComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = this.disabled || defaultProps.disabled;
    this._id = this.id || generateUid();
    this._label = this.label || defaultProps.className;
    this._name = this.name || generateUid();
    this._options = this.options || defaultProps.options;
    this._required = getBooleanValue(this.required, defaultProps.required);
    this._value = this._value || defaultProps.value;

    this._isTouched = false;
    this._isValid = this.validate(this._value, this._required);
  }

  validate(value: string, required: boolean) {
    if (!required) {
      return true;
    }

    if (required && value) {
      return true;
    }

    return false;
  }

  onRadioBlur() {
    this._isTouched = true;
  }

  onRadioChange(selectedOption: CustomRadioOption) {
    this._value = selectedOption.value;
    this._isValid = this.validate(this._value, this._required);

    if (this.onChange) {
      this.onChange(selectedOption);
    }
  }
}
