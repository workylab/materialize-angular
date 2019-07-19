import { BUTTON_TYPE, ButtonModel } from './button.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-button }`,
  templateUrl: './button.component.html'
})
export class ButtonComponent implements ButtonModel {
  static readonly defaultProps: ButtonModel = {
    className: '',
    disabled: false,
    type: BUTTON_TYPE.BUTTON
  };

  @Input() className: string = ButtonComponent.defaultProps.className;
  @Input() disabled: boolean = ButtonComponent.defaultProps.disabled;
  @Input() type: BUTTON_TYPE = ButtonComponent.defaultProps.type;

  @Output('onBlur') onBlurEmitter: EventEmitter<void>;
  @Output('onClick') onClickEmitter: EventEmitter<void>;

  public prefix = config.components.prefix;
  public isFocused: boolean;

  constructor() {
    this.isFocused = false;

    this.onBlurEmitter = new EventEmitter();
    this.onClickEmitter = new EventEmitter();
  }

  onFocus() {
    if (!this.disabled) {
      this.isFocused = true;
    }
  }

  onClick() {
    if (!this.disabled) {
      this.onClickEmitter.emit();

      this.isFocused = false;
    }
  }

  onBlur() {
    this.onBlurEmitter.emit();

    this.isFocused = false;
  }
}
