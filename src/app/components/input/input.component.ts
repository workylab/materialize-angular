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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { InputModel } from './input.model';
import { PrefixDirective } from '../../directives/prefix.directive';
import { SuffixDirective } from '../../directives/suffix.directive';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => InputComponent)
  }, {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent)
  }],
  selector: 'materialize-input',
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html'
})
export class InputComponent extends FormFieldAbstract implements ControlValueAccessor, OnChanges, OnInit {
  static readonly defaultProps: InputModel = {
    autocomplete: 'none',
    className: '',
    disabled: false,
    floatLabel: '',
    hasCounter: false,
    id: null,
    maxLength: 500,
    name: '',
    placeholder: '',
    required: false,
    type: 'text',
    value: ''
  };

  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('formControlWrapper') formControlWrapperRef: ElementRef;

  @ContentChildren(PrefixDirective) materializePrefixQueryList: QueryList<PrefixDirective>;
  @ContentChildren(SuffixDirective) materializeSuffixQueryList: QueryList<SuffixDirective>;

  @Output('onFocus') onFocusEmitter: EventEmitter<Event>;
  @Output('onChange') onChangeEmitter: EventEmitter<Event>;
  @Output('onBlur') onBlurEmitter: EventEmitter<Event>;

  @Input('autocomplete') autocompleteInput: string;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('hasCounter') hasCounterInput: boolean;
  @Input('id') idInput: string | null;
  @Input('maxLength') maxLengthInput: number;
  @Input('name') nameInput: string;
  @Input('placeholder') placeholderInput: string;
  @Input('required') requiredInput: boolean;
  @Input('type') typeInput: 'text' | 'password';
  @Input('validateOnBlur') validateOnBlurInput: boolean;
  @Input('validateOnChange') validateOnChangeInput: boolean;
  @Input('value') valueInput: string;

  public autocomplete: string;
  public className: string;
  public disabled: boolean;
  public floatLabel: string;
  public hasCounter: boolean;
  public id: string | null;
  public isTouched: boolean;
  public isFocused: boolean;
  public maxLength: number;
  public name: string;
  public placeholder: string;
  public required: boolean;
  public type: string;
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
    const { defaultProps } = InputComponent;

    this.autocomplete = this.autocompleteInput || defaultProps.autocomplete;
    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.hasCounter = getBooleanValue(this.hasCounterInput, defaultProps.hasCounter);
    this.id = this.idInput || defaultProps.id;
    this.maxLength = this.maxLengthInput || defaultProps.maxLength;
    this.name = this.nameInput || defaultProps.name;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.type = this.typeInput || defaultProps.type;
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
    this.isTouched = false;
  }

  onBlur(event: any): void {
    const { nativeElement } = this.formControlWrapperRef;
    const { relatedTarget } = event;

    this.onBlurEmitter.emit(event);

    // TODO:
    if (!this.floatLabel || relatedTarget !== nativeElement) {
      this.isTouched = true;
      this.isFocused = false;
    }
  }

  onFocus(event: Event): void {
    if (!this.disabled) {
      this.isFocused = true;
      this.onFocusEmitter.emit(event);
      this.inputRef.nativeElement.focus();

      this.onTouched();
    }
  }

  onChange(event: any): void {
    const { value } = event.target;

    this.value = value;
    this.onChangeEmitter.emit(event);
    this.onInputChange(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onInputChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(value: string): void {}

  onTouched(): void {}
}
