import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import { CustomSwitch } from './custom-switch.model';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomSwitchComponent)
  }],
  selector: 'custom-switch',
  templateUrl: './custom-switch.component.html'
})
export class CustomSwitchComponent extends CustomFormFieldAbstract implements OnInit {
  static readonly defaultProps: CustomSwitch = {
    className: '',
    disabled: false,
    errorMessage: '',
    id: '',
    label: '',
    name: '',
    required: false,
    value: false
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: boolean;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public id: string;
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

  initValues() {
    const { defaultProps } = CustomSwitchComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.id = this.idInput || defaultProps.id;
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = getBooleanValue(this.valueInput, defaultProps.value);

    this.isFocused = false;
    this.isTouched = false;
    this.isValid = this.validate(this.value, this.required);
  }

  validate(value: boolean, required: boolean) {
    if (required && !value) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }

  toggleValue() {
    if (!this.disabled) {
      this.value = !this.value;
      this.isValid = this.validate(this.value, this.required);
    }
  }

  onBlur(event: any) {
    this.isFocused = false;
    this.isTouched = true;
  }

  onFocus(event: any) {
    this.isFocused = true;
  }

  updateAndValidity() {
    this.isTouched = true;
    this.isValid = this.validate(this.value, this.required);
  }
}
