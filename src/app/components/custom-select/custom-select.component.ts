import { Component, Input, OnInit } from '@angular/core';
import { CustomSelectOption } from './custom-select.model';

interface defaultProps {
  className: string;
  disabled: boolean;
  isTouched: boolean;
  label: string;
  options: Array<CustomSelectOption>;
  required: boolean;
  value: string;
}

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html'
})
export class CustomSelectComponent implements OnInit {
  static readonly defaultProps: defaultProps = {
    className: 'form-control',
    disabled: false,
    isTouched: false,
    label: '',
    options: [],
    required: false,
    value: null
  };

  @Input() onChange: (selectedOption: CustomSelectOption) => void;

  @Input() className: string;
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() options: Array<CustomSelectOption>;
  @Input() required: boolean;
  @Input() value: string;

  public _className: string;
  public _disabled: boolean;
  public _isTouched: boolean;
  public _isValid: boolean;
  public _label: string;
  public _options: Array<CustomSelectOption>;
  public _required: boolean;
  public _selectedOption: CustomSelectOption;
  public _value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomSelectComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = this.disabled || defaultProps.disabled;
    this._label = this.label || defaultProps.label;
    this._options = this.options || defaultProps.options;
    this._required = this.required || defaultProps.required;
    this._value = this.value || defaultProps.value;

    this._selectedOption = this.getInitIndexOption(this._value, this._options);

    this._isValid = this.validate(this._value, this._required);
    this._isTouched = defaultProps.isTouched;
  }

  onSelectBlur(): void {
    this._isTouched = true;
  }

  validate(value: string, isRequired: boolean): boolean {
    if (!isRequired) {
      return true;
    }

    if (isRequired && value) {
      return true;
    }

    return false;
  }

  getInitIndexOption(value: string, options: Array<CustomSelectOption>): CustomSelectOption {
    for (let i = 0; i < options.length; i++) {
      const currentOption = options[i];

      if (value === currentOption.value) {
        return currentOption;
      }
    }

    return options[0];
  }

  onSelectChange(event: any) {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = this._options[selectedIndex];

    this._isTouched = true;
    this._isValid = this.validate(selectedOption.value, this._required);
    this._selectedOption = selectedOption;
    this._value = selectedOption.value;

    if (this.onChange) {
      this.onChange(selectedOption);
    }
  }
}
