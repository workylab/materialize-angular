import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CustomCheckboxList, CustomCheckboxListItem } from './custom-checkbox-list.model';
import { cloneObject } from '../../utils/clone-object.util';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomCheckboxListComponent)
  }],
  selector: 'custom-checkbox-list',
  templateUrl: './custom-checkbox-list.component.html'
})
export class CustomCheckboxListComponent extends CustomFormFieldAbstract implements OnInit {
  static readonly defaultProps: CustomCheckboxList = {
    checkAllLabel: '',
    className: '',
    disabled: false,
    errorMessage: '',
    iconName: '',
    id: '',
    isFocused: false,
    isTouched: false,
    isValid: false,
    items: [],
    label: '',
    name: '',
    required: false,
    updateAndValidity: () => {},
    value: {}
  };

  @Input('checkAllLabel') checkAllLabelInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('id') idInput: string;
  @Input('items') itemsInput: Array<CustomCheckboxListItem>;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;

  public checkAllLabel: string;
  public checkAllValue: boolean;
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public iconName: string;
  public id: string;
  public items: Array<CustomCheckboxListItem>;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public required: boolean;
  public value: {
    [key: string]: boolean;
  };

  constructor() {
    super();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomCheckboxListComponent;

    const items = this.itemsInput || defaultProps.items;

    this.className = this.className || defaultProps.className;
    this.checkAllLabel = this.checkAllLabelInput || defaultProps.checkAllLabel;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.items = cloneObject(items);
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);

    this.isFocused = false;
    this.isTouched = false;
    this.isValid = this.validate(this.items, this.required);
    this.value = {};

    const checkedCheckboxesLength = this.getCheckedCheckboxesLength(this.items);

    this.checkAllValue = checkedCheckboxesLength === this.items.length
      ? true
      : false;
  }

  getCheckedCheckboxesLength(items: Array<CustomCheckboxListItem>): number {
    const checkedCheckboxes = items.filter(item => item.value);

    return checkedCheckboxes.length;
  }

  onChangeAll(value: boolean) {
    if (value) {
      this.checkAllCheckboxes(this.items, true);

      // this.items[0].value = true;
      // this.items[0].disabled = true;
    } else {
      this.items = cloneObject(this.itemsInput);
    }

    if (value && this.items.length > 1) {
      // this.enableAllCheckboxes(this.items);
    }

    this.checkAllValue = value;
    this.isTouched = true;
    this.isValid = this.validate(this.items, this.required);
    this.value = this.generateValue(this.items);
  }

  checkAllCheckboxes(items: Array<CustomCheckboxListItem>, value: boolean): void {
    items.map(item => {
      item.value = value;
    });
  }

  enableAllCheckboxes(items: Array<CustomCheckboxListItem>) {
    items.map(item => {
      item.disabled = false;
    });
  }

  onChangeCheckbox(value: boolean, currentCheckbox: any) {
    currentCheckbox.value = value;

    const checkedCheckboxesLength = this.getCheckedCheckboxesLength(this.items);

    this.checkAllValue = checkedCheckboxesLength > 1 && checkedCheckboxesLength === this.items.length
      ? true
      : false;

    this.isTouched = true;
    this.isValid = this.validate(this.items, this.required);
    this.value = this.generateValue(this.items);
  }

  generateValue(items: Array<CustomCheckboxListItem>): { [key: string]: boolean; } {
    const values = {};

    items.forEach(item => {
      values[item.name] = item.value;
    });

    return values;
  }

  validate(items: Array<CustomCheckboxListItem>, required: boolean): boolean {
    const checkedCheckboxesLength = this.getCheckedCheckboxesLength(items);

    if (required && !checkedCheckboxesLength) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }

  updateAndValidity() {
    this.isTouched = true;
    this.isValid = this.validate(this.items, this.required);
  }
}
