import { Component, Input, OnInit } from '@angular/core';
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
    text: ''
  };

  @Input('className') classNameInput: string;
  @Input('disabled') disabledInput: boolean;
  @Input('iconAtEnd') iconAtEndInput: boolean;
  @Input('iconName') iconNameInput: string;
  @Input('isRounded') isRoundedInput: boolean;
  @Input('size') sizeInput: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  @Input('text') textInput: string;

  public className: string;
  public disabled: boolean;
  public iconName: string;
  public iconAtEnd: boolean;
  public isRounded: boolean;
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  public text: string;

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
  }
}
