import { Component, Input } from '@angular/core';
import { CustomCalendarDay } from '../custom-calendar/custom-calendar.model';
import { CustomDatePicker } from './custom-datepicker.model';

@Component({
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html'
})
export class CustomDatePickerComponent implements CustomDatePicker {
  @Input('className') classNameInput: string;
  @Input('iconName') iconNameInput: string;
  @Input('label') labelInput: string;
  @Input('name') nameInput: string;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public iconName: string;
  public isFocused: boolean;
  public isTouched: boolean;
  public isValid: boolean;
  public label: string;
  public name: string;
  public required: boolean;
  public value: string;

  constructor() {
    this.onInputBlur = this.onInputBlur.bind(this);
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
}
