import { Component, Input, OnInit } from '@angular/core';
import { generateUid } from '../../utils/generate-uid.util';
import { isBoolean } from '../../utils/is-boolean.util';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html'
})
export class CustomCheckboxComponent implements OnInit {
  static readonly defaultProps = {
    className: 'form-control',
    disabled: false,
    label: '',
    required: false,
    value: false
  };

  @Input() onChange: (value: boolean) => void;

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

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomCheckboxComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = isBoolean(this.disabled)
      ? this.disabled
      : defaultProps.disabled;
    this._label = this.label || defaultProps.label;
    this._name = this.name || generateUid();
    this._required = isBoolean(this.required)
      ? this.required
      : defaultProps.required;
    this._value = isBoolean(this.value)
      ? this.value
      : defaultProps.value;
  }

  onCheckboxChange(event: any) {
    const { value } = event.target;

    // TODO: Testing....
    // this._isValid = this.validate(value, this.required);
    this._value = value;

    if (this.onChange) {
      this.onChange(value);
    }
  }
}

