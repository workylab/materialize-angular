import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModel } from './checkbox.model';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => CheckboxComponent)
  }, {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent)
  }],
  selector: 'materialize-checkbox',
  styleUrls: ['./checkbox.component.scss'],
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends FormFieldAbstract implements OnInit, OnChanges, ControlValueAccessor {
  static readonly defaultProps: CheckboxModel = {
    className: '',
    disabled: false,
    id: '',
    indeterminate: false,
    name: '',
    required: false,
    value: false
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('indeterminate') indeterminateInput: boolean;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: boolean;

  @Output('onChange') onChangeEmitter: EventEmitter<boolean>;

  public className: string;
  public disabled: boolean;
  public id: string;
  public indeterminate: boolean;
  public isFocused: boolean;
  public name: string;
  public required: boolean;
  public value: boolean;

  constructor() {
    super();

    this.onChangeEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { disabledInput, indeterminateInput, valueInput } = changes;

    if (valueInput && valueInput.currentValue !== valueInput.previousValue) {
      this.value = valueInput.currentValue;
    }

    if (disabledInput && disabledInput.currentValue !== disabledInput.previousValue) {
      this.disabled = disabledInput.currentValue;
    }

    if (indeterminateInput && indeterminateInput.currentValue !== indeterminateInput.previousValue) {
      this.indeterminate = indeterminateInput.currentValue;
    }
  }

  initValues(): void {
    const { defaultProps } = CheckboxComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.id = this.idInput || defaultProps.id;
    this.indeterminate = getBooleanValue(this.indeterminateInput, defaultProps.indeterminate);
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = getBooleanValue(this.valueInput, defaultProps.value);

    this.isFocused = false;
  }

  toggleValue(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.isFocused = false;

      this.onChange(this.value);
      this.onChangeEmitter.emit(this.value);
    }
  }

  onFocus(event: Event): void {
    if (!this.disabled) {
      this.isFocused = true;

      this.onTouched();
    }
  }

  onBlur(event: Event): void {
    this.isFocused = false;
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

