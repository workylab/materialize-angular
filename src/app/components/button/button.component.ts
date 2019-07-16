import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModel } from './button.model';
import { config } from '../../config';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: `${ config.components.prefix }-button }`,
  styleUrls: ['./button.component.scss'],
  templateUrl: './button.component.html'
})
export class ButtonComponent implements ButtonModel, OnInit {
  static readonly defaultProps: ButtonModel = {
    className: '',
    disabled: false,
    iconAtEnd: false,
    iconName: '',
    isRounded: false,
    size: 'md',
    type: 'button'
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('iconAtEnd') iconAtEndInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('isRounded') isRoundedInput: boolean;
  @Input('size') sizeInput: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input('type') typeInput: 'button' | 'submit';

  @Output('onBlur') onBlurEmitter: EventEmitter<Event>;
  @Output('onClick') onClickEmitter: EventEmitter<void>;

  public className: string;
  public disabled: boolean;
  public iconName: string;
  public iconAtEnd: boolean;
  public isFocused: boolean;
  public isRounded: boolean;
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.iconAtEnd = this.iconAtEndInput || defaultProps.iconAtEnd;
    this.isRounded = getBooleanValue(this.isRoundedInput, defaultProps.isRounded);
    this.size = this.sizeInput || defaultProps.size;
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

  onBlur(event: Event) {
    this.onBlurEmitter.emit(event);

    this.isFocused = false;
  }
}
