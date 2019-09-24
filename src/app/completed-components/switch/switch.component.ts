import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { config } from '../../config';
import { SwitchModel } from './switch.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitchComponent)
  }],
  selector: `${ config.components.prefix }-switch }`,
  templateUrl: './switch.component.html'
})
export class SwitchComponent implements ControlValueAccessor, SwitchModel {
  static readonly defaultProps: SwitchModel = {
    className: '',
    disabled: false,
    id: null,
    name: '',
    required: false,
    value: false
  };

  @Input() className: string = SwitchComponent.defaultProps.className;
  @Input() disabled: boolean = SwitchComponent.defaultProps.disabled;
  @Input() id: string | null = SwitchComponent.defaultProps.id;
  @Input() name: string = SwitchComponent.defaultProps.name;
  @Input() required: boolean = SwitchComponent.defaultProps.required;
  @Input() value: boolean = SwitchComponent.defaultProps.value;

  @Output('onChange') onChangeEmitter: EventEmitter<boolean>;

  public prefix = config.components.prefix;

  public isFocused: boolean;

  constructor() {
    this.isFocused = false;

    this.onChangeEmitter = new EventEmitter();
  }

  toggleValue(): void {
    if (!this.disabled) {
      this.isFocused = false;
      this.value = !this.value;

      this.onChange(this.value);
      this.onChangeEmitter.emit(this.value);
    }
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onFocus(): void {
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
