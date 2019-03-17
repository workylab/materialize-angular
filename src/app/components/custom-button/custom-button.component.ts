import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomButton } from './custom-button.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html'
})
export class CustomButtonComponent implements CustomButton, OnInit {
  static readonly defaultProps: CustomButton = {
    className: '',
    disabled: false,
    iconAtEnd: false,
    iconName: '',
    isRounded: false,
    size: 'md',
    text: '',
    type: 'button'
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('iconAtEnd') iconAtEndInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('isRounded') isRoundedInput: boolean;
  @Input('size') sizeInput: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input('text') textInput: string;
  @Input('type') typeInput: 'button' | 'submit';

  @Output('onBlur') onBlurEmitter: EventEmitter<Event>;
  @Output('onClick') onClickEmitter: EventEmitter<void>;

  public className: string;
  public disabled: boolean;
  public iconName: string;
  public iconAtEnd: boolean;
  public isRounded: boolean;
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  public text: string;
  public type: 'button' | 'submit';

  constructor() {
    this.onBlurEmitter = new EventEmitter();
    this.onClickEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomButtonComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.disabled = getBooleanValue(this.disabledInput, defaultProps.disabled);
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.iconAtEnd = this.iconAtEndInput || defaultProps.iconAtEnd;
    this.isRounded = getBooleanValue(this.isRoundedInput, defaultProps.isRounded);
    this.size = this.sizeInput || defaultProps.size;
    this.text = this.textInput || defaultProps.text;
    this.type = this.typeInput || defaultProps.type;
  }

  onClick() {
    this.onClickEmitter.emit();
  }

  onBlur(event: Event) {
    this.onBlurEmitter.emit(event);
  }
}
