import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonToggleModel } from './button-toggle.model';
import { config } from '../../config';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: `${ config.components.prefix }-button-toggle }`,
  styleUrls: ['./button-toggle.component.scss'],
  templateUrl: './button-toggle.component.html'
})
export class ButtonToggleComponent implements OnInit {
  static readonly defaultProps: ButtonToggleModel = {
    className: '',
    disabled: false,
    name: '',
    value: ''
  };

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('name') nameInput: string;
  @Input('value') valueInput: string;

  public className: string;
  public disabled: boolean;
  public isActive: boolean;
  public isFocused: boolean;
  public name: string;
  public value: string;

  constructor() {
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = ButtonToggleComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.name = this.nameInput || defaultProps.name;
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

  onFocus(): void {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }
}
