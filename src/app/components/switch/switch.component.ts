import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { SwitchModel } from './switch.model';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => SwitchComponent)
  }, {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent)
  }],
  selector: 'materialize-switch',
  styleUrls: ['./switch.component.scss'],
  templateUrl: './switch.component.html'
})
export class SwitchComponent extends FormFieldAbstract implements ControlValueAccessor, OnInit {
  static readonly defaultProps: SwitchModel = {
    className: '',
    disabled: false,
    id: '',
    name: '',
    required: false,
    value: false
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: boolean;

  public className: string;
  public disabled: boolean;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public name: string;
  public required: boolean;
  public value: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    const { defaultProps } = SwitchComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.id = this.idInput || defaultProps.id;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = getBooleanValue(this.valueInput, defaultProps.value);

    this.isFocused = false;
    this.isTouched = false;
  }

  toggleValue(): void {
    if (!this.disabled) {
      this.isFocused = false;
      this.value = !this.value;

      this.onChange(this.value);
    }
  }

  onBlur(event: any): void {
    this.isFocused = false;
    this.isTouched = true;
  }

  onFocus(event: any): void {
    if (!this.disabled) {
      this.isFocused = true;

      this.onTouched();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: boolean): void {}

  onTouched(): void {}
}
