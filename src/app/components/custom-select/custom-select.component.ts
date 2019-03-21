import { Component, Input, OnInit } from '@angular/core';
import { CustomSelect, CustomSelectOption } from './custom-select.model';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html'
})
export class CustomSelectComponent implements CustomSelect, OnInit {
  static readonly defaultProps: CustomSelect = {
    className: '',
    disabled: false,
    errorMessage: '',
    floatLabel: true,
    iconName: '',
    id: '',
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    name: '',
    options: [],
    required: false,
    selectedOption: {} as CustomSelectOption,
    value: ''
  };

  @Input() onChange: (selectedOption: CustomSelectOption) => void;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<CustomSelectOption>;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: boolean;
  public iconName: string;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public options: Array<CustomSelectOption>;
  public required: boolean;
  public selectedOption: CustomSelectOption;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomSelectComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = getBooleanValue(this.floatLabelInput, defaultProps.floatLabel);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.id = this.idInput || defaultProps.id;
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.options = this.optionsInput || defaultProps.options;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = defaultProps.isFocused;
    this.isTouched = defaultProps.isTouched;
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

  getInitOption(value: string, options: Array<CustomSelectOption>): CustomSelectOption {
    for (let i = 0; i < options.length; i++) {
      const currentOption = options[i];

      if (value === currentOption.value) {
        return currentOption;
      }
    }

    return {} as CustomSelectOption;
  }

  selectOption(event: any, selectedOption: CustomSelectOption) {
    event.stopImmediatePropagation();

    this.selectedOption = selectedOption;

    this.value = selectedOption
      ? selectedOption.value
      : '';

    this.closeMenu();

    this.isValid = this.validate(this.value, this.required);

    if (this.onChange) {
      this.onChange(selectedOption);
    }
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
}
