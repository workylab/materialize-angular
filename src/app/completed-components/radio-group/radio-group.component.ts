import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { config } from '../../config';
import { RadioComponent } from '../radio/radio.component';
import { RadioGroupModel } from './radio-group.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent)
  }],
  selector: `${ config.components.prefix }-radio-group }`,
  templateUrl: './radio-group.component.html'
})
export class RadioGroupComponent implements AfterContentInit, ControlValueAccessor, RadioGroupModel {
  static readonly defaultProps: RadioGroupModel = {
    canUncheck: false,
    className: '',
    disabled: false,
    id: '',
    name: '',
    required: false,
    value: ''
  };

  @ContentChildren(RadioComponent) radiosQueryList: QueryList<RadioComponent>;

  @Output('onChange') onChangeEmitter: EventEmitter<string>;

  @Input() canUncheck: boolean = RadioGroupComponent.defaultProps.canUncheck;
  @Input() className: string = RadioGroupComponent.defaultProps.className;
  @Input() disabled: boolean = RadioGroupComponent.defaultProps.disabled;
  @Input() id: string = RadioGroupComponent.defaultProps.id;
  @Input() name: string = RadioGroupComponent.defaultProps.name;
  @Input() required: boolean = RadioGroupComponent.defaultProps.required;
  @Input() value: string = RadioGroupComponent.defaultProps.value;

  public prefix = config.components.prefix;
  public isFocused: boolean;

  constructor() {
    this.isFocused = false;

    this.initRadios = this.initRadios.bind(this);
    this.registerRadios = this.registerRadios.bind(this);
    this.toggleRadios = this.toggleRadios.bind(this);

    this.onChangeEmitter = new EventEmitter();
  }

  ngAfterContentInit() {
    this.initRadios();

    this.radiosQueryList.changes.subscribe(this.initRadios);
  }

  initRadios() {
    this.disableAllRadios(this.disabled);

    setTimeout(this.registerRadios, 0);
  }

  registerRadios() {
    this.radiosQueryList.forEach(radio => {
      radio.isActive = (radio.value === this.value);

      radio.onClickEmitter.subscribe(this.toggleRadios);
    });
  }

  toggleRadios(value: string) {
    this.setValueAllRadios(value);

    const currentRadio = this.radiosQueryList.find(radio => radio.value === value);

    this.value = currentRadio && currentRadio.isActive
      ? currentRadio.value
      : '';

    this.onTouched();
    this.onChange(this.value);

    this.onChangeEmitter.emit(this.value);
  }

  setValueAllRadios(value: string) {
    this.radiosQueryList.forEach(radio => {
      if (radio.value !== value) {
        radio.isActive = false;
      }

      if (radio.value === value && !this.canUncheck) {
        radio.isActive = true;
      }
    });
  }

  disableAllRadios(disabled: boolean) {
    this.radiosQueryList.forEach(radio => {
      radio.disabled = disabled;
    });
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    setTimeout(() => {
      this.disableAllRadios(this.disabled);
    }, 0);
  }

  writeValue(value: string): void {
    this.value = value;

    setTimeout(() => {
      this.setValueAllRadios(this.value);
    }, 0);
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
