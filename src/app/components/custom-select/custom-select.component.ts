import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CustomSelectOption } from './custom-select.model';
import { FormField } from '../custom-form/custom-form.model';

interface defaultProps {
  className: string;
  disabled: boolean;
  floatLabel: boolean;
  iconName: string;
  isFocused: boolean;
  isOpen: boolean;
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
export class CustomSelectComponent implements FormField, OnInit {
  static readonly defaultProps: defaultProps = {
    className: '',
    disabled: false,
    floatLabel: true,
    iconName: '',
    isFocused: false,
    isOpen: false,
    isTouched: false,
    label: '',
    options: [],
    required: false,
    value: null
  };

  @Input() onChange: (selectedOption: CustomSelectOption) => void;

  @Input() className: string;
  @Input() disabled: boolean;
  @Input() floatLabel: boolean;
  @Input() iconName: string;
  @Input() label: string;
  @Input() options: Array<CustomSelectOption>;
  @Input() required: boolean;
  @Input() value: string;

  public _className: string;
  public _disabled: boolean;
  public _floatLabel: boolean;
  public _iconName: string;
  public _isFocused: boolean;
  public _isOpen: boolean;
  public _isTouched: boolean;
  public _isValid: boolean;
  public _label: string;
  public _options: Array<CustomSelectOption>;
  public _required: boolean;
  public _selectedOption: CustomSelectOption;
  public _value: string;

  constructor() {
    this.closeMenu = this.closeMenu.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomSelectComponent;

    this._className = this.className || defaultProps.className;
    this._disabled = this.disabled || defaultProps.disabled;
    this._floatLabel = this.floatLabel || defaultProps.floatLabel;
    this._iconName = this.iconName || defaultProps.iconName;
    this._label = this.label || defaultProps.label;
    this._options = this.options || defaultProps.options;
    this._required = this.required || defaultProps.required;
    this._value = this.value || defaultProps.value;

    this._selectedOption = this.getInitIndexOption(this._value, this._options);

    this._isFocused = defaultProps.isFocused;
    this._isTouched = defaultProps.isTouched;
    this._isValid = this.validate(this._value, this._required);
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

    return null;
  }

  selectOption(event: any, selectedOption: CustomSelectOption) {
    event.stopImmediatePropagation();

    this._selectedOption = selectedOption;

    this._value = selectedOption
      ? selectedOption.value
      : null;

    this._isValid = this.validate(this._value, this._required);

    this.closeMenu();

    if (this.onChange) {
      this.onChange(selectedOption);
    }
  }

  openMenu() {
    this._isFocused = true;
    this._isTouched = true;
  }

  closeMenu() {
    this._isFocused = false;
    this._isOpen = false;
  }
}
