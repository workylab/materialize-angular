import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'materialize-radio',
  styleUrls: ['./radio.component.scss'],
  templateUrl: './radio.component.html'
})
export class RadioComponent implements OnInit {
  static readonly defaultProps = {
    disabled: false,
    value: ''
  };

  @Output('onClick') onClickEmitter: EventEmitter<string>;

  @Input('disabled') disabledInput: boolean;
  @Input('value') valueInput: string;

  public isActive: boolean;
  public disabled: boolean;
  public isFocused: boolean;
  public value: string;

  constructor() {
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = RadioComponent;

    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.value = this.valueInput || defaultProps.value;

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
