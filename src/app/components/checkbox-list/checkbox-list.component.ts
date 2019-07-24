import { AfterContentInit, Component, ContentChildren, forwardRef, Input, OnInit, QueryList } from '@angular/core';
import { CheckboxListModel, CheckboxListValueModel } from './checkbox-list.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxComponent } from '../../completed-components/checkbox/checkbox.component';
import { config } from '../../config';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxListComponent)
  }],
  selector: `${ config.components.prefix }-checkbox-list }`,
  styleUrls: ['./checkbox-list.component.scss'],
  templateUrl: './checkbox-list.component.html'
})
export class CheckboxListComponent implements AfterContentInit, OnInit, ControlValueAccessor {
  static readonly defaultProps: CheckboxListModel = {
    checkAllLabel: 'Check all',
    className: '',
    disabled: false,
    id: '',
    name: '',
    required: false,
    value: null
  };

  @ContentChildren(CheckboxComponent) checkboxesQueryList: QueryList<CheckboxComponent>;

  @Input('checkAllLabel') checkAllLabelInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: CheckboxListValueModel | null;

  public checkAllLabel: string;
  public checkAllValue: boolean;
  public className: string;
  public checkboxes: Array<CheckboxComponent>;
  public disabled: boolean;
  public id: string;
  public isFocused: boolean;
  public name: string;
  public required: boolean;
  public value: CheckboxListValueModel | null;

  constructor() {
    this.disableAllCheckboxes = this.disableAllCheckboxes.bind(this);
    this.setCheckboxesValue = this.setCheckboxesValue.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterContentInit() {
    this.checkboxes = this.checkboxesQueryList.toArray();

    for (const checkbox of this.checkboxes) {
      checkbox.onChangeEmitter.subscribe((value: boolean) => {
        this.onChangeCheckbox(value, checkbox);
      });
    }

    if (this.disabled) {
      this.disableAllCheckboxes();
    }

    this.checkAllValue = this.isCheckedAll();
  }

  initValues() {
    const { defaultProps } = CheckboxListComponent;

    this.className = this.className || defaultProps.className;
    this.checkAllLabel = this.checkAllLabelInput || defaultProps.checkAllLabel;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
  }

  disableAllCheckboxes() {
    for (const checkbox of this.checkboxes) {
      checkbox.disabled = true;
    }
  }

  setCheckboxesValue() {
    for (const checkbox of this.checkboxes) {
      const value = this.value
        ? this.value[checkbox.name]
        : null;

      checkbox.value = Boolean(value);
    }
  }

  onChangeAll(value: boolean) {
    this.checkboxes.map(item => {
      if (!item.disabled) {
        item.value = value;
      }
    });

    this.checkAllValue = value;
    this.value = this.generateValue(this.checkboxes);

    this.onTouched();
    this.onChange(this.value);
  }

  onChangeCheckbox(value: boolean, currentCheckbox: any) {
    currentCheckbox.value = value;

    this.value = this.generateValue(this.checkboxes);
    this.checkAllValue = this.isCheckedAll();

    this.onTouched();
    this.onChange(this.value);
  }

  isCheckedAll() {
    const valueKeys = this.value
      ? Object.keys(this.value)
      : [];
    const checkedValues = valueKeys.filter(item => this.value && this.value[item] === true);
    const checkedCheckboxes = this.checkboxes.filter(item => item.value === true);

    return (checkedValues.length > 1 && checkedValues.length === this.checkboxes.length)
      || (checkedCheckboxes.length > 1 && checkedCheckboxes.length === this.checkboxes.length)
      ? true
      : false;
  }

  generateValue(checkboxes: Array<CheckboxComponent>): { [key: string]: boolean; } | null {
    const activeCheckboxes = checkboxes.filter(item => item.value);
    const values = {};

    if (!activeCheckboxes.length) {
      return null;
    }

    checkboxes.forEach(item => {
      values[item.name] = item.value;
    });

    return values;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (isDisabled) {
      setTimeout(this.disableAllCheckboxes, 0);
    }
  }

  writeValue(value: CheckboxListValueModel): void {
    this.value = value;

    setTimeout(this.setCheckboxesValue, 0);
  }

  registerOnChange(fn: (value: CheckboxListValueModel) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: any): void {}

  onTouched(): void {}
}
