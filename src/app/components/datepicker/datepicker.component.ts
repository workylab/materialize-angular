import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { DateModel } from '../calendar/calendar.model';
import { DatePickerModel } from './datepicker.model';
import { FormFieldAbstract } from '../form/form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: FormFieldAbstract,
    useExisting: forwardRef(() => DatePickerComponent)
  }],
  selector: 'materialize-datepicker',
  styleUrls: ['./datepicker.component.scss'],
  templateUrl: './datepicker.component.html'
})
export class DatePickerComponent extends FormFieldAbstract implements OnInit {
  static readonly defaultProps: DatePickerModel = {
    autocomplete: 'none',
    className: '',
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
    super();

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

    this.isOpen = false;
  }

  onSelectDay(selectedDate: DateModel) {
    this.value = this.formatDate(selectedDate.date);
    this.isOpen = false;
  }

  formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth();

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

  open() {
    this.isOpen = true;

    setTimeout(() => {
      this.backdropRef.nativeElement.addEventListener('click', this.close);
    }, 0);
  }

  close() {
    this.isOpen = false;
  }
}
