import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CustomCalendarDay } from '../custom-calendar/custom-calendar.model';
import { CustomDatePicker } from './custom-datepicker.model';
import { CustomFormFieldAbstract } from '../custom-form/custom-form-field.abstract';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  providers: [{
    provide: CustomFormFieldAbstract,
    useExisting: forwardRef(() => CustomDatePickerComponent)
  }],
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html'
})
export class CustomDatePickerComponent extends CustomFormFieldAbstract implements OnInit {
  static readonly defaultProps: CustomDatePicker = {
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
    name: '',
    required: false,
    updateAndValidity: () => {},
    value: ''
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('floatLabel') floatLabelInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('id') idInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public errorMessage: string;
  public floatLabel: boolean;
  public iconName: string;
  public id: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public required: boolean;
  public value: string;

  constructor() {
    super();

    this.onInputBlur = this.onInputBlur.bind(this);
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomDatePickerComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.floatLabel = getBooleanValue(this.floatLabelInput, defaultProps.floatLabel);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.id = this.idInput || defaultProps.id;
    this.label = this.labelInput || defaultProps.label;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isFocused = defaultProps.isFocused;
    this.isTouched = defaultProps.isTouched;
    this.isValid = defaultProps.isValid;
  }

  onSelectDay(day: CustomCalendarDay) {
    this.value = day.isoDate;
    this.isFocused = false;
  }

  onInputFocus() {
    this.isFocused = true;
  }

  onInputBlur(event: any) {
    const { relatedTarget } = event;

    if (!relatedTarget || relatedTarget.className !== 'calendar-container') {
      this.isFocused = false;
    }
  }

  onCalendarBlur(event: Event) {
    this.isFocused = false;
  }

  updateAndValidity() {
    this.isTouched = true;

    // TODO: this.isValid = this.validate(this.value, this.required);
  }
}
