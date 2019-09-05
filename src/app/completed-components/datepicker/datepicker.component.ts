import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { config } from '../../config';
import { DateModel } from '../calendar/calendar.model';
import { DatePickerModel } from './datepicker.model';
import { INPUT_TYPE } from '../input/input.model';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent)
  }],
  selector: `${ config.components.prefix }-datepicker }`,
  templateUrl: './datepicker.component.html'
})
export class DatePickerComponent implements ControlValueAccessor, OnInit {
  static readonly DAY_KEY = 'dd';
  static readonly MONTH_KEY = 'mm';
  static readonly YEAR_KEY = 'yyyy';

  static readonly defaultProps: DatePickerModel = {
    autocomplete: 'none',
    className: '',
    date: new Date(),
    disabled: false,
    floatLabel: '',
    format: 'dd-mm-yyyy',
    fullSize: false,
    hasCounter: false,
    id: null,
    maxLength: 500,
    name: '',
    placeholder: '',
    required: false,
    type: INPUT_TYPE.TEXT,
    value: ''
  };

  @ViewChild('backdrop', {static: false}) backdropRef: ElementRef;

  @Input() className: string = DatePickerComponent.defaultProps.className;
  @Input() disabled: boolean = DatePickerComponent.defaultProps.disabled;
  @Input() floatLabel: string = DatePickerComponent.defaultProps.floatLabel;
  @Input() format: string = DatePickerComponent.defaultProps.format;
  @Input() fullSize: boolean = DatePickerComponent.defaultProps.fullSize;
  @Input() id: string | null = DatePickerComponent.defaultProps.id;
  @Input() name: string = DatePickerComponent.defaultProps.name;
  @Input() placeholder: string = DatePickerComponent.defaultProps.placeholder;
  @Input() required: boolean = DatePickerComponent.defaultProps.required;
  @Input() value: string = DatePickerComponent.defaultProps.value;

  public prefix = config.components.prefix;

  public date: Date;
  public isOpen: boolean;

  constructor() {
    this.isOpen = false;

    this.close = this.close.bind(this);
  }

  ngOnInit() {
    this.date = this.buildDate(this.value);
  }

  onSelectDay(selectedDate: DateModel) {
    this.isOpen = false;
    this.date = selectedDate.date;
    this.value = this.formatDate(selectedDate.date);

    this.onChange(this.value);
  }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;

    const dayString = day < 10
      ? `0${ day }`
      : day.toString();

    const monthString = month < 10
      ? `0${ month }`
      : month.toString();

    const yearString = date.getFullYear().toString();

    const formatedDate = this.format
      .replace('dd', dayString)
      .replace('mm', monthString)
      .replace('yyyy', yearString);

    return formatedDate;
  }

  buildDate(value: string): Date {
    const dayStartPosition = this.format.indexOf(DatePickerComponent.DAY_KEY);
    const monthStartPosition = this.format.indexOf(DatePickerComponent.MONTH_KEY);
    const yearStartPosition = this.format.indexOf(DatePickerComponent.YEAR_KEY);

    if (dayStartPosition >= 0 && monthStartPosition >= 0 && yearStartPosition >= 0) {
      const dayEndPosition = dayStartPosition + DatePickerComponent.DAY_KEY.length;
      const monthEndPosition = monthStartPosition + DatePickerComponent.MONTH_KEY.length;
      const yearEndPosition = yearStartPosition + DatePickerComponent.YEAR_KEY.length;

      const dayString = value.substring(dayStartPosition, dayEndPosition);
      const monthString = value.substring(monthStartPosition, monthEndPosition);
      const yearString = value.substring(yearStartPosition, yearEndPosition);

      if (dayString && monthString && yearString) {
        const day = Number(dayString);
        const month = Number(monthString) - 1;
        const year = Number(yearString);

        return new Date(year, month, day);
      }
    }

    return new Date();
  }

  open() {
    this.isOpen = true;

    setTimeout(() => {
      this.backdropRef.nativeElement.addEventListener('click', this.close);
    }, 0);
  }

  close() {
    this.isOpen = false;
  }

  onInputChange(value: string) {
    this.onChange(value);

    this.date = this.buildDate(value);
  }

  onInputFocus() {
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;

    this.date = this.buildDate(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange(value: string): void {}

  onTouched(): void {}
}
