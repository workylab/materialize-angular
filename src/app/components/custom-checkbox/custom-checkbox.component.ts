import { Component, Input, OnInit } from '@angular/core';
import { CustomCheckbox } from './custom-checkbox.model';
import { generateUid } from '../../utils/generate-uid.util';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html'
})
export class CustomCheckboxComponent implements CustomCheckbox, OnInit {
  static readonly defaultProps: CustomCheckbox = {
    className: 'checkbox-control',
    disabled: false,
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    name: '',
    required: false,
    value: false
  };

  @Input() onChange: (value: boolean) => void;
  @Input() onBlur: (value: boolean) => void;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: boolean;

  public className: string;
  public disabled: boolean;
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
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || generateUid();
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = getBooleanValue(this.valueInput, defaultProps.value);

    this.isValid = this.validate(this.value, this.required);
    this.isTouched = defaultProps.isTouched;
  }

  onCheckboxChange(event: any): void {
    const { checked } = event.target;

    this.isValid = this.validate(checked, this.required);
    this.value = checked;

    if (this.onChange) {
      this.onChange(checked);
    }
  }

  validate(isChecked: boolean, isRequired: boolean): boolean {
    if (!isRequired) {
      return true;
    }

    if (isRequired && isChecked) {
      return true;
    }

    return false;
  }

  onCheckboxBlur(): void {
    this.isTouched = true;

    if (this.onBlur) {
      this.onBlur(this.value);
    }
  }
}

