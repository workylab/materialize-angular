import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModel } from './button.model';
import { config } from '../../config';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: `${ config.components.prefix }-button }`,
  templateUrl: './button.component.html'
})
export class ButtonComponent implements ButtonModel, OnInit {
  static readonly defaultProps: ButtonModel = {
    className: '',
    disabled: false,
    type: 'button'
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('type') typeInput: 'button' | 'submit';

  @Output('onBlur') onBlurEmitter: EventEmitter<void>;
  @Output('onClick') onClickEmitter: EventEmitter<void>;

  public prefix = config.components.prefix;

  public className: string;
  public disabled: boolean;
  public isFocused: boolean;
  public type: 'button' | 'submit';

  constructor() {
    this.onBlurEmitter = new EventEmitter();
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = ButtonComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.type = this.typeInput || defaultProps.type;

    this.isFocused = false;
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
