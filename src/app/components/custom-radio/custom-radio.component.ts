import { Component, Input, OnInit } from '@angular/core';
import { CustomRadio, CustomRadioOption } from './custom.radio.model';
import { generateUid } from '../../utils/generate-uid.util';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html'
})
export class CustomRadioComponent implements CustomRadio, OnInit {
  static readonly defaultProps: CustomRadio = {
    className: 'form-control',
    disabled: false,
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    name: '',
    options: [],
    required: false,
    value: null
  };

  @Input() onBlur: () => void;
  @Input() onChange: (selectedOption: CustomRadioOption) => void;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('options') optionsInput: Array<CustomRadioOption>;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public id: string;
  public label: string;
  public name: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
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
    this.id = this.idInput || generateUid();
    this.label = this.labelInput || defaultProps.className;
    this.name = this.nameInput || generateUid();
    this.options = this.optionsInput || defaultProps.options;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isTouched = false;
    this.isValid = this.validate(this.value, this.required);
  }

  validate(value: string, required: boolean) {
    if (!required) {
      return true;
    }

    if (required && value) {
      return true;
    }

    return false;
  }

  onRadioBlur() {
    this.isTouched = true;
  }

  onRadioChange(selectedOption: CustomRadioOption) {
    this.value = selectedOption.value;
    this.isValid = this.validate(this.value, this.required);

    if (this.onChange) {
      this.onChange(selectedOption);
    }
  }
}
