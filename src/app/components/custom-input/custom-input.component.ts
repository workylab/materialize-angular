import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import { CustomInput } from './custom-input.model';
import { CustomPrefixDirective } from '../../directives/prefix.directive';
import { CustomSuffixDirective } from '../../directives/suffix.directive';
import fieldValidations from '../../fixtures/field-validations';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomInputComponent)
  }],
  selector: 'custom-input',
  templateUrl: './custom-input.component.html'
})
export class CustomInputComponent extends CustomFormFieldAbstract implements OnInit, OnChanges {
  static readonly defaultProps: CustomInput = {
    autocomplete: 'none',
    className: '',
    disabled: false,
    errorMessage: '',
    floatLabel: '',
    hasCounter: false,
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
    textAlign: 'left',
    type: 'text',
    updateAndValidity: () => {},
    validateOnBlur: true,
    validateOnChange: true,
    value: ''
  };

  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('formControlWrapper') formControlWrapperRef: ElementRef;

  @ContentChildren(CustomPrefixDirective) customPrefixQueryList: QueryList<CustomPrefixDirective>;
  @ContentChildren(CustomSuffixDirective) customSuffixQueryList: QueryList<CustomSuffixDirective>;

  @Output('onFocus') onFocusEmitter: EventEmitter<Event>;
  @Output('onChange') onChangeEmitter: EventEmitter<Event>;
  @Output('onBlur') onBlurEmitter: EventEmitter<Event>;

  @Input('autocomplete') autocompleteInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('hasCounter') hasCounterInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('maxLength') maxLengthInput: number;
  @Input('name') nameInput: string;
  @Input('placeholder') placeholderInput: string;
  @Input('required') requiredInput: boolean;
  @Input('textAlign') textAlignInput: 'left' | 'right';
  @Input('type') typeInput: 'text' | 'password';
  @Input('patternName') patternNameInput: string;
  @Input('validateOnBlur') validateOnBlurInput: boolean;
  @Input('validateOnChange') validateOnChangeInput: boolean;
  @Input('value') valueInput: string;

  public autocomplete: string;
  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: string;
  public hasCounter: boolean;
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
  public textAlign: 'left' | 'right';
  public type: string;
  public validateOnBlur: boolean;
  public validateOnChange: boolean;
  public value: string;

  constructor() {
    super();

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
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.label = this.labelInput || defaultProps.label;
    this.hasCounter = getBooleanValue(this.hasCounterInput, defaultProps.hasCounter);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.id = this.idInput || defaultProps.id;
    this.maxLength = this.maxLengthInput || defaultProps.maxLength;
    this.name = this.nameInput || defaultProps.name;
    this.patternName = this.patternNameInput || defaultProps.patternName;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.textAlign = this.textAlignInput || defaultProps.textAlign;
    this.type = this.typeInput || defaultProps.type;
    this.validateOnBlur = getBooleanValue(this.validateOnBlurInput, defaultProps.validateOnBlur);
    this.validateOnChange = getBooleanValue(this.validateOnChangeInput, defaultProps.validateOnChange);
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
    const { nativeElement } = this.formControlWrapperRef;
    const { relatedTarget } = event;

    this.onBlurEmitter.emit(event);

    if (this.validateOnBlur && (!this.floatLabel || relatedTarget !== nativeElement)) {
      this.isTouched = true;
      this.isFocused = false;
      this.isValid = this.validate(this.value, this.required);
    }
  }

  onFocus(event: Event): void {
    if (!this.disabled) {
      this.isFocused = true;
      this.onFocusEmitter.emit(event);
      this.inputRef.nativeElement.focus();
    }
  }

  onChange(event: any): void {
    const { value } = event.target;

    this.value = value;
    this.onChangeEmitter.emit(event);

    if (this.validateOnChange) {
      this.isValid = this.validate(this.value, this.required);
    }
  }

  updateAndValidity() {
    this.isTouched = true;
    this.isValid = this.validate(this.value, this.required);
  }
}
