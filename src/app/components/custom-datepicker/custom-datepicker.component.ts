import { Component, Input } from '@angular/core';
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
}
