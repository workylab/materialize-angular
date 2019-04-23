import { CheckboxListItemModel, CheckboxListModel, CheckboxListValueModel } from './checkbox-list.model';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { cloneObject } from '../../utils/clone-object.util';
import fieldValidations from '../../fixtures/field-validations';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => CheckboxListComponent)
  }],
  selector: 'materialize-checkbox-list',
  templateUrl: './checkbox-list.component.html'
})
export class CheckboxListComponent extends FormFieldAbstract implements OnInit {
  static readonly defaultProps: CheckboxListModel = {
    checkAllLabel: 'Check all',
    className: '',
    disabled: false,
    errorMessage: '',
    id: '',
    items: [],
    label: '',
    name: '',
    required: false,
    value: {}
  };

  @Input('checkAllLabel') checkAllLabelInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('items') itemsInput: Array<CheckboxListItemModel>;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;

  public checkAllLabel: string;
  public checkAllValue: boolean;
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public id: string;
  public items: Array<CheckboxListItemModel>;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public required: boolean;
  public value: CheckboxListValueModel;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CheckboxListComponent;
    const items = this.itemsInput || defaultProps.items;

    this.className = this.className || defaultProps.className;
    this.checkAllLabel = this.checkAllLabelInput || defaultProps.checkAllLabel;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
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

  getCheckedCheckboxesLength(items: Array<CheckboxListItemModel>): number {
    const checkedCheckboxes = items.filter(item => item.value);

    return checkedCheckboxes.length;
  }

  onChangeAll(value: boolean) {
    this.changeAllCheckboxesValue(this.items, value);

    this.checkAllValue = value;
    this.isTouched = true;
    this.isValid = this.validate(this.items, this.required);
    this.value = this.generateValue(this.items);
  }

  changeAllCheckboxesValue(items: Array<CheckboxListItemModel>, value: boolean): void {
    items.map(item => {
      if (!item.disabled) {
        item.value = value;
      }
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

  generateValue(items: Array<CheckboxListItemModel>): { [key: string]: boolean; } {
    const values = {};

    items.forEach(item => {
      values[item.name] = item.value;
    });

    return values;
  }

  validate(items: Array<CheckboxListItemModel>, required: boolean): boolean {
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
