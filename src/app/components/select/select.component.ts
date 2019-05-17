import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { SelectModel, SelectOptionModel } from './select.model';
import fieldValidations from '../../fixtures/field-validations';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => SelectComponent)
  }],
  selector: 'materialize-select',
  styleUrls: ['./select.component.scss'],
  templateUrl: './select.component.html'
})
export class SelectComponent extends FormFieldAbstract implements OnInit {
  static readonly defaultProps: SelectModel = {
    className: '',
    disabled: false,
    errorMessage: '',
    floatLabel: '',
    id: '',
    label: '',
    name: '',
    options: [],
    required: false,
    selectedOption: {} as SelectOptionModel,
    value: ''
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<SelectOptionModel>;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: string;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public options: Array<SelectOptionModel>;
  public required: boolean;
  public selectedOption: SelectOptionModel;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SelectComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.id = this.idInput || defaultProps.id;
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.options = this.optionsInput || defaultProps.options;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isTouched = false;
    this.selectedOption = this.getInitOption(this.value, this.options);
    this.isValid = this.validate(this.value, this.required);
  }

  validate(value: string, required: boolean): boolean {
    if (required && !value) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }

  getInitOption(value: string, options: Array<SelectOptionModel>): SelectOptionModel {
    for (let i = 0; i < options.length; i++) {
      const currentOption = options[i];

      if (value === currentOption.value) {
        return currentOption;
      }
    }

    return {} as SelectOptionModel;
  }

  selectOption(event: any, selectedOption: SelectOptionModel) {
    event.stopImmediatePropagation();

    this.selectedOption = selectedOption;

    this.value = selectedOption
      ? selectedOption.value
      : '';

    this.closeMenu();

    this.isValid = this.validate(this.value, this.required);
  }

  openMenu() {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }

  closeMenu() {
    this.isTouched = true;
    this.isFocused = false;
  }

  updateAndValidity() {
    this.isTouched = true;
    this.isValid = this.validate(this.value, this.required);
  }
}
