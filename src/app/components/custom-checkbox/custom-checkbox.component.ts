import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { CustomCheckbox } from './custom-checkbox.model';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-checkbox',
  templateUrl: './custom-checkbox.component.html'
})
export class CustomCheckboxComponent implements CustomCheckbox, OnInit {
  static readonly defaultProps: CustomCheckbox = {
    className: '',
    disabled: false,
    iconName: '',
    indeterminate: false,
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    name: '',
    required: false,
    value: false
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('indeterminate') indeterminateInput: boolean;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: boolean;

  @Output('onChange') onChangeEmitter: EventEmitter<boolean>;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public iconName: string;
  public indeterminate: boolean;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public required: boolean;
  public value: boolean;

  constructor() {
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
    const { defaultProps } = CustomCheckboxComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.indeterminate = getBooleanValue(this.indeterminateInput, defaultProps.indeterminate);
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = getBooleanValue(this.valueInput, defaultProps.value);

    this.isFocused = defaultProps.isFocused;
    this.isTouched = defaultProps.isTouched;
    this.isValid = this.validate(this.value, this.required);
  }

  toggleValue(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.isValid = this.validate(this.value, this.required);

      this.onChangeEmitter.emit(this.value);
    }
  }

  validate(value: boolean, required: boolean) {
    if (required && !value) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    return true;
  }

  onFocus(event: Event): void {
    this.isFocused = true;
  }

  onBlur(event: Event): void {
    this.isTouched = true;
  }
}

