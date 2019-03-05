import { Component, Input, OnInit } from '@angular/core';
import { CustomCheckbox } from './custom-checkbox.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

const fieldValidations = require('../../fixtures/field-validations.json');

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html'
})
export class CustomCheckboxComponent implements CustomCheckbox, OnInit {
  static readonly defaultProps: CustomCheckbox = {
    className: 'checkbox-control',
    disabled: false,
    iconName: '',
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    name: '',
    required: false,
    value: false
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: boolean;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public iconName: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public required: boolean;
  public value: boolean;

  ngOnInit() {
    this.initValues();
  }

  initValues(): void {
    const { defaultProps } = CustomCheckboxComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = getBooleanValue(this.valueInput, defaultProps.value);

    this.isFocused = defaultProps.isFocused;
    this.isTouched = defaultProps.isTouched;
    this.isValid = this.validate(this.value, this.required);
  }

  toggleValue(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.isValid = this.validate(this.value, this.required);
    }
  }

  validate(value: boolean, required: boolean) {
    if (required && !value) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isTouched = true;
  }
}

