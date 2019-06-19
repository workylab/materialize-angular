import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { RadioComponent } from '../radio/radio.component';
import { RadioGroupModel } from './radio-group.model';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => RadioGroupComponent)
  }, {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent)
  }],
  selector: 'materialize-radio-group',
  styleUrls: ['./radio-group.component.scss'],
  templateUrl: './radio-group.component.html'
})
export class RadioGroupComponent extends FormFieldAbstract implements OnInit, AfterContentInit, ControlValueAccessor {
  static readonly defaultProps: RadioGroupModel = {
    canUncheck: false,
    className: '',
    disabled: false,
    id: '',
    indicatorAtEnd: false,
    name: '',
    required: false,
    value: ''
  };

  @ContentChildren(RadioComponent) radiosQueryList: QueryList<RadioComponent>;

  @Output('onChange') onChangeEmitter: EventEmitter<string>;

  @Input('canUncheck') canUncheckInput: boolean;
  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('indicatorAtEnd') indicatorAtEndInput: boolean;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public canUncheck: boolean;
  public className: string;
  public disabled: boolean;
  public id: string;
  public indicatorAtEnd: boolean;
  public isFocused: boolean;
  public name: string;
  public radios: Array<RadioComponent>;
  public required: boolean;
  public value: string;

  constructor() {
    super();

    this.disableAllRadios = this.disableAllRadios.bind(this);
    this.registerRadios = this.registerRadios.bind(this);
    this.toggleRadios = this.toggleRadios.bind(this);

    this.onChangeEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterContentInit() {
    this.initRadios();

    this.radiosQueryList.changes.subscribe(changes => {
      this.initRadios();
    });
  }

  initValues() {
    const { defaultProps } = RadioGroupComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = this.disabledInput || defaultProps.disabled;
    this.id = this.idInput || defaultProps.id;
    this.indicatorAtEnd = getBooleanValue(this.indicatorAtEndInput, defaultProps.indicatorAtEnd);
    this.canUncheck = getBooleanValue(this.canUncheckInput, defaultProps.canUncheck);
    this.name = this.nameInput || defaultProps.name;
    this.radios = [];
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = false;
  }

  initRadios() {
    this.radios = this.radiosQueryList.toArray();

    setTimeout(this.registerRadios, 0);

    if (this.disabled) {
      this.disableAllRadios();
    }
  }

  registerRadios() {
    for (let i = 0; i < this.radios.length; i++) {
      const currentRadio = this.radios[i];

      currentRadio.isActive = (currentRadio.value === this.value);

      currentRadio.onClickEmitter.subscribe(this.toggleRadios);
    }
  }

  toggleRadios(value: string) {
    this.setValueAllRadios(value);

    const currentRadio = this.radios.find(item => item.value === value);

    this.value = currentRadio && currentRadio.isActive
      ? currentRadio.value
      : '';

    this.onTouched();
    this.onChange(this.value);

    this.onChangeEmitter.emit(this.value);
  }

  setValueAllRadios(value: string) {
    for (let i = 0; i < this.radios.length; i++) {
      const currentRadio = this.radios[i];

      if (currentRadio.value !== value) {
        currentRadio.isActive = false;
      }

      if (currentRadio.value === value && !this.canUncheck) {
        currentRadio.isActive = true;
      }
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (this.disabled) {
      setTimeout(this.disableAllRadios, 0);
    }
  }

  disableAllRadios() {
    this.radios.forEach(item => {
      item.disabled = true;
    });
  }

  writeValue(value: string): void {
    this.value = value;

    this.setValueAllRadios(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: string): void {
  }

  onTouched(): void {}
}
