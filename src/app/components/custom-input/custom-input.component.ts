import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CustomInput } from './custom-input.model';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html'
})
export class CustomInputComponent implements CustomInput, OnInit, OnChanges {
  static readonly defaultProps: CustomInput = {
    autocomplete: 'none',
    className: '',
    disabled: false,
    errorMessage: '',
    floatLabel: true,
    iconName: '',
    id: '',
    isFocused: false,
    isTouched: false,
    isValid: false,
    label: '',
    maxLength: 500,
    name: '',
    patternName: '',
    placeholder: '',
    required: false,
    type: 'text',
    value: ''
  };

  @ViewChild('inputViewChild') inputElementRef: ElementRef;
  @ViewChild('labelViewChild') labelElementRef: ElementRef;

  @Output('onFocus') onFocusEmitter: EventEmitter<Event>;
  @Output('onChange') onChangeEmitter: EventEmitter<Event>;
  @Output('onBlur') onBlurEmitter: EventEmitter<Event>;

  @Input('autocomplete') autocompleteInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('maxLength') maxLengthInput: number;
  @Input('name') nameInput: string;
  @Input('placeholder') placeholderInput: string;
  @Input('required') requiredInput: boolean;
  @Input('type') typeInput: 'text' | 'password';
  @Input('patternName') patternNameInput: string;
  @Input('value') valueInput: string;

  public autocomplete: string;
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: boolean;
  public iconName: string;
  public id: string;
  public isTouched: boolean;
  public isFocused: boolean;
  public isValid: boolean;
  public label: string;
  public maxLength: number;
  public name: string;
  public patternName: string;
  public placeholder: string;
  public required: boolean;
  public type: string;
  public value: string;

  constructor() {
    this.onBlurEmitter = new EventEmitter();
    this.onChangeEmitter = new EventEmitter();
    this.onFocusEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { valueInput } = changes;

    if (valueInput && valueInput.currentValue !== valueInput.previousValue) {
      this.value = valueInput.currentValue;
    }
  }

  initValues(): void {
    const { defaultProps } = CustomInputComponent;

    this.autocomplete = this.autocompleteInput || defaultProps.autocomplete;
    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = getBooleanValue(this.floatLabelInput, defaultProps.floatLabel);
    this.label = this.labelInput || defaultProps.label;
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.id = this.idInput || defaultProps.id;
    this.maxLength = this.maxLengthInput || defaultProps.maxLength;
    this.name = this.nameInput || defaultProps.name;
    this.patternName = this.patternNameInput || defaultProps.patternName;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.type = this.typeInput || defaultProps.type;
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = defaultProps.isFocused;
    this.isTouched = defaultProps.isTouched;
    this.isValid = this.validate(this.value, this.required);
  }

  validate(value: string, required: boolean): boolean {
    const cleanValue = value.trim();

    this.errorMessage = '';

    if (!required && this.patternName && cleanValue.length) {
      const fieldValidation = fieldValidations[this.patternName];

      if (!this.validRegex(cleanValue, fieldValidation.regex)) {
        this.errorMessage = fieldValidation.errorMessage;

        return false;
      }
    }

    if (required && !cleanValue.length && !this.patternName) {
      const fieldValidation = fieldValidations['required'];

      this.errorMessage = fieldValidation.errorMessage;

      return false;
    }

    if (required && this.patternName) {
      const fieldValidation = fieldValidations[this.patternName];

      if (!this.validRegex(cleanValue, fieldValidation.regex)) {
        this.errorMessage = fieldValidation.errorMessage;

        return false;
      }
    }

    return true;
  }

  validRegex(value: string, regex: string): boolean {
    const customRegex = new RegExp(regex);
    const resultRegexValidation = customRegex.test(value);

    if (resultRegexValidation) {
      return true;
    }

    return false;
  }

  onBlur(event: any): void {
    if (!this.label || event.relatedTarget !== this.labelElementRef.nativeElement) {
      this.isTouched = true;
      this.isFocused = false;

      this.isValid = this.validate(this.value, this.required);
      this.onBlurEmitter.emit(event);
    }
  }

  onFocus(event: Event): void {
    this.isFocused = true;
    this.onFocusEmitter.emit(event);
    this.inputElementRef.nativeElement.focus();
  }

  onChange(event: any): void {
    const { value } = event.target;

    this.value = value;
    this.isValid = this.validate(this.value, this.required);
    this.onChangeEmitter.emit(event);
  }
}
