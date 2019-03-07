import { Component, Input, OnInit } from '@angular/core';
import { CustomTextArea } from './custom-textarea.model';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-textarea',
  templateUrl: './custom-textarea.component.html'
})
export class CustomTextAreaComponent implements CustomTextArea, OnInit {
  static readonly defaultProps: CustomTextArea = {
    className: '',
    disabled: false,
    errorMessage: '',
    floatLabel: true,
    iconName: '',
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    maxLength: 500,
    minLength: 0,
    name: '',
    placeholder: '',
    required: false,
    value: ''
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('maxLength') maxLengthInput: number;
  @Input('minLength') minLengthInput: number;
  @Input('placeholder') placeholderInput: string;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: boolean;
  public iconName: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public minLength: number;
  public maxLength: number;
  public name: string;
  public placeholder: string;
  public required: boolean;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues(): void {
    const { defaultProps } = CustomTextAreaComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = getBooleanValue(this.floatLabelInput, defaultProps.floatLabel);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.label = this.labelInput || defaultProps.label;
    this.maxLength = this.maxLengthInput || defaultProps.maxLength;
    this.minLength = this.minLengthInput || defaultProps.minLength;
    this.name = this.nameInput || defaultProps.name;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = defaultProps.isFocused;
    this.isTouched = defaultProps.isTouched;
    this.isValid = this.validate(this.value);
  }

  onTextAreaBlur(): void {
    this.isValid = this.validate(this.value);

    this.isFocused = false;
    this.isTouched = true;
  }

  onTextAreaFocus(): void {
    this.isFocused = true;
  }

  onTextAreaChange(event: any): void {
    const { value } = event.target;

    this.isValid = this.validate(value);
    this.value = value;
  }

  validate(value: string): boolean {
    this.errorMessage = '';

    if (this.required && (this.minLength > value.length || this.maxLength < value.length)) {
      return false;
    }

    if (this.required && !value.length) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }
}
