import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { CustomAutocomplete } from './custom-autocomplete.model';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { CustomSelectOption } from '../custom-select/custom-select.model';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomAutocompleteComponent)
  }],
  selector: 'custom-autocomplete',
  templateUrl: './custom-autocomplete.component.html'
})
export class CustomAutocompleteComponent extends CustomFormFieldAbstract implements OnInit {
  static readonly defaultProps: CustomAutocomplete = {
    autocomplete: '',
    className: '',
    disabled: false,
    errorMessage: 'The value does not match with any option',
    floatLabel: '',
    hasCounter: false,
    id: '',
    isMatchValue: false,
    label: '',
    maxLength: 500,
    name: '',
    options: [],
    patternName: '',
    placeholder: '',
    required: false,
    textAlign: 'left',
    type: 'text',
    validateOnBlur: false,
    validateOnChange: false,
    value: ''
  };

  @ViewChild('customInput') customInputComponent: CustomInputComponent;

  @Input('autocomplete') autocompleteInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('hasCounter') hasCounterInput: boolean;
  @Input('id') idInput: string;
  @Input('isMatchValue') isMatchValueInput: boolean;
  @Input('label') labelInput: string;
  @Input('maxLength') maxLengthInput: number;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<CustomSelectOption>;
  @Input('placeholder') placeholderInput: string;
  @Input('required') requiredInput: boolean;
  @Input('textAlign') textAlignInput: 'left' | 'right';
  @Input('value') valueInput: string;

  public autocomplete: string;
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: string;
  public hasCounter: boolean;
  public id: string;
  public isFocused: boolean;
  public isMatchValue: boolean;
  public isTouched: boolean;
  public label: string;
  public maxLength: number;
  public name: string;
  public options: Array<CustomSelectOption>;
  public patternName: string;
  public placeholder: string;
  public required: boolean;
  public textAlign: 'left' | 'right';
  public type: string;
  public validateOnBlur: boolean;
  public validateOnChange: boolean;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomAutocompleteComponent;

    this.autocomplete = this.autocompleteInput || defaultProps.autocomplete;
    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.hasCounter = getBooleanValue(this.hasCounterInput, defaultProps.hasCounter);
    this.id = this.idInput || defaultProps.id;
    this.isMatchValue = getBooleanValue(this.isMatchValueInput, defaultProps.isMatchValue);
    this.label = this.labelInput || defaultProps.label;
    this.maxLength = this.maxLengthInput || defaultProps.maxLength;
    this.name = this.nameInput || defaultProps.name;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.textAlign = this.textAlignInput || defaultProps.textAlign;
    this.value = this.valueInput || defaultProps.value;

    this.options = this.filterOptions(this.value);

    this.isFocused = false;
    this.isTouched = false;
    this.patternName = defaultProps.patternName;
    this.type = defaultProps.type;
    this.validateOnBlur = defaultProps.validateOnBlur;
    this.validateOnChange = defaultProps.validateOnChange;

    this.isValid = this.validate(this.value, this.required);
  }

  onInputFocus(event: any) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    this.isFocused = true;
  }

  onInputChange(event: any) {
    const { value } = event.target;

    this.options = this.filterOptions(value);
    this.value = value;
    this.isValid = this.validate(this.value, this.required);

    this.customInputComponent.isValid = this.isValid;
  }

  onInputBlur(event: any) {
    const { relatedTarget } = event;

    if (!relatedTarget || relatedTarget.className !== 'select-option') {
      this.closeMenu();

      this.isValid = this.validate(this.value, this.required);

      this.customInputComponent.isValid = this.isValid;
      this.customInputComponent.isFocused = false;
      this.customInputComponent.isTouched = true;
    }
  }

  validate(value: string, required: boolean) {
    if (required && !value.length) {
      this.errorMessage = fieldValidations['required'].errorMessage;
      this.customInputComponent.errorMessage = this.errorMessage;

      return false;
    }

    if (required && value.length && this.isMatchValue && !this.isValidOption(value)) {
      const { errorMessage } = CustomAutocompleteComponent.defaultProps;

      this.errorMessage = errorMessage;
      this.customInputComponent.errorMessage = this.errorMessage;

      return false;
    }

    return true;
  }

  isValidOption(value: string): boolean {
    for (let i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      const validatedContent = currentOption.content || '';

      if (value.toLowerCase() === validatedContent.toLowerCase()) {
        return true;
      }
    }

    return false;
  }

  filterOptions(value: string): Array<CustomSelectOption> {
    const validValue = value || '';
    const valueLowerCase = validValue.toLowerCase();

    return this.optionsInput.filter(item => {
      const content = item.content || '';
      const contentLowerCase = content.toLowerCase();

      if (contentLowerCase.includes(valueLowerCase)) {
        return item;
      }
    });
  }

  selectOption(value: string) {
    this.value = value || '';
    this.isValid = this.validate(this.value, this.required);
    this.customInputComponent.isValid = this.isValid;

    this.closeMenu();
  }

  closeMenu() {
    this.isFocused = false;
    this.isTouched = true;

    this.customInputComponent.isFocused = false;
  }

  openMenu() {
    this.isFocused = true;
  }

  updateAndValidity() {
    this.customInputComponent.updateAndValidity();
    this.isValid = this.validate(this.value, this.required);
    this.isTouched = true;
  }
}
