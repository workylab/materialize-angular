import { Component, Input, OnInit } from '@angular/core';
import { CustomSelectOption } from './custom-select.model';

interface defaultProps {
  className: string;
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
    isTouched: false,
    label: '',
    options: [],
    required: false,
    value: null
  };

  @Input() onChange: (selectedOption: CustomSelectOption) => void;

  @Input() className: string;
  @Input() label: string;
  @Input() options: Array<CustomSelectOption>;
  @Input() required: boolean;
  @Input() value: string;

  private _className: string;
  private _isTouched: boolean;
  private _isValid: boolean;
  private _label: string;
  private _options: Array<CustomSelectOption>;
  private _required: boolean;
  private _selectedOption: CustomSelectOption;
  private _value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomSelectComponent;

    this._className = this.className || defaultProps.className;
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
