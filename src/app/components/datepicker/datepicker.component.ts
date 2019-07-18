import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { config } from '../../config';
import { DateModel } from '../calendar/calendar.model';
import { DatePickerModel } from './datepicker.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent)
  }],
  selector: `${ config.components.prefix }-datepicker }`,
  styleUrls: ['./datepicker.component.scss'],
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
    type: 'text',
    value: ''
  };

  @ViewChild('backdrop') backdropRef: ElementRef;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: string;
  @Input('format') formatInput: string;
  @Input('fullSize') fullSizeInput: boolean;
  @Input('id') idInput: string | null;
  @Input('name') nameInput: string;
  @Input('placeholder') placeholderInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public date: Date;
  public disabled: boolean;
  public floatLabel: string;
  public format: string;
  public fullSize: boolean;
  public id: string | null;
  public isOpen: boolean;
  public name: string;
  public placeholder: string;
  public required: boolean;
  public value: string;

  constructor() {
    this.close = this.close.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = DatePickerComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = this.floatLabelInput || defaultProps.floatLabel;
    this.format = this.formatInput || defaultProps.format;
    this.fullSize = getBooleanValue(this.fullSizeInput, defaultProps.fullSize);
    this.id = this.idInput || defaultProps.id;
    this.name = this.nameInput || defaultProps.name;
    this.placeholder = this.placeholderInput || defaultProps.placeholder;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.date = this.buildDate(this.value);
    this.isOpen = false;
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
