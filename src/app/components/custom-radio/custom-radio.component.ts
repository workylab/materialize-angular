import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CustomRadio, CustomRadioOption } from './custom.radio.model';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomRadioComponent)
  }],
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html'
})
export class CustomRadioComponent extends CustomFormFieldAbstract implements OnInit {
  static readonly defaultProps: CustomRadio = {
    canUncheck: false,
    className: '',
    disabled: false,
    errorMessage: '',
    id: '',
    label: '',
    name: '',
    options: [],
    required: false,
    value: ''
  };

  @Input('canUncheck') canUncheckInput: boolean;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<CustomRadioOption>;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public canUncheck: boolean;
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public options: Array<CustomRadioOption>;
  public required: boolean;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomRadioComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = this.disabledInput || defaultProps.disabled;
    this.id = this.idInput || defaultProps.id;
    this.canUncheck = getBooleanValue(this.canUncheckInput, defaultProps.canUncheck);
    this.label = this.labelInput || defaultProps.className;
    this.name = this.nameInput || defaultProps.name;
    this.options = this.optionsInput || defaultProps.options;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isTouched = false;
    this.isValid = this.validate(this.value, this.required);
  }

  validate(value: string, required: boolean) {
    this.errorMessage = '';

    if (required && !value) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }

  onBlur(event: Event) {
    this.isTouched = true;
  }

  onChange(value: string) {
    if (!this.disabled) {
      const { defaultProps } = CustomRadioComponent;

      this.value = (this.value === value && this.canUncheck)
        ? defaultProps.value
        : value;

      this.isTouched = true;
      this.isValid = this.validate(this.value, this.required);
    }
  }

  updateAndValidity() {
    this.isTouched = true;
    this.isValid = this.validate(this.value, this.required);
  }
}
