import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { config } from '../../config';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { RadioModel } from './radio.model';

@Component({
  selector: `${ config.components.prefix }-radio }`,
  styleUrls: ['./radio.component.scss'],
  templateUrl: './radio.component.html'
})
export class RadioComponent implements OnInit {
  static readonly defaultProps: RadioModel = {
    className: '',
    disabled: false,
    id: '',
    name: '',
    required: false,
    value: ''
  };

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('id') idInput: string;
  @Input('name') nameInput: string;
  @Input('required') requiredInput: boolean;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public id: string;
  public isActive: boolean;
  public isFocused: boolean;
  public name: string;
  public required: boolean;
  public value: string;

  constructor() {
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = RadioComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.id = this.idInput || defaultProps.id;
    this.name = this.nameInput || defaultProps.name;
    this.required = getBooleanValue(this.requiredInput, defaultProps.required);
    this.value = this.valueInput || defaultProps.value;

    this.isActive = false;
    this.isFocused = false;
  }

  onClick() {
    if (!this.disabled) {
      this.isActive = !this.isActive;
      this.isFocused = false;
      this.onClickEmitter.emit(this.value);
    }
  }

  onBlur() {
    this.isFocused = false;
  }

  onFocus(event: Event): void {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }
}
