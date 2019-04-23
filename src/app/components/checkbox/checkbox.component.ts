import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CheckboxModel } from './checkbox.model';
import fieldValidations from '../../fixtures/field-validations';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => CheckboxComponent)
  }],
  selector: 'materialize-checkbox',
  templateUrl: './checkbox.component.html'
})
export class CheckboxComponent extends FormFieldAbstract implements OnInit {
  static readonly defaultProps: CheckboxModel = {
    className: '',
    disabled: false,
    errorMessage: '',
    id: '',
    indeterminate: false,
    label: '',
    name: '',
    required: false,
    value: false
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('indeterminate') indeterminateInput: boolean;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: boolean;

  @Output('onChange') onChangeEmitter: EventEmitter<boolean>;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public id: string;
  public indeterminate: boolean;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
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
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = getBooleanValue(this.valueInput, defaultProps.value);

    this.isFocused = false;
    this.isTouched = false;
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

  updateAndValidity() {
    this.isTouched = true;
    this.isValid = this.validate(this.value, this.required);
  }
}

