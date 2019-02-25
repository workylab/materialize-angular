import { Component, Input, OnInit } from '@angular/core';
import { generateUid } from '../../utils/generate-uid.util';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html'
})
export class CustomCheckboxComponent implements OnInit {
  static readonly defaultProps = {
    className: 'checkbox-control',
    disabled: false,
    isTouched: false,
    label: '',
    required: false,
    value: false
  };

  @Input() onChange: (value: boolean) => void;
  @Input() onBlur: (value: boolean) => void;

  @Input() className: string;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() name: string;
  @Input() required: boolean;
  @Input() value: boolean;

  public _className: string;
  public _disabled: boolean;
  public _label: string;
  public _name: string;
  public _required: boolean;
  public _value: boolean;
  public _isTouched: boolean;
  public _isValid: boolean;

  ngOnInit() {
    this.initValues();
  }

  initValues(): void {
    const { defaultProps } = CustomCheckboxComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = getBooleanValue(this.disabled, defaultProps.disabled);
    this._label = this.label || defaultProps.label;
    this._name = this.name || generateUid();
    this._required = getBooleanValue(this.required, defaultProps.required);
    this._value = getBooleanValue(this.value, defaultProps.value);

    this._isValid = this.validate(this._value, this._required);
    this._isTouched = defaultProps.isTouched;
  }

  onCheckboxChange(event: any): void {
    const { checked } = event.target;

    this._isValid = this.validate(checked, this._required);
    this._value = checked;

    if (this.onChange) {
      this.onChange(checked);
    }
  }

  validate(isChecked: boolean, isRequired: boolean): boolean {
    if (!isRequired) {
      return true;
    }

    if (isRequired && isChecked) {
      return true;
    }

    return false;
  }

  onCheckboxBlur(): void {
    this._isTouched = true;

    if (this.onBlur) {
      this.onBlur(this._value);
    }
  }
}

