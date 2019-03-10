import { Component, Input, OnInit } from '@angular/core';
import { CustomTooltip } from './custom-tooltip.model';

@Component({
  selector: 'custom-tooltip',
  templateUrl: './custom-tooltip.component.html'
})
export class CustomTooltipComponent implements OnInit {
  static readonly defaultProps: CustomTooltip = {
    className: '',
    isFocused: false,
    isHovered: false,
    position: 'top',
    text: ''
  };

  @Input('className') classNameInput: string;
  @Input('position') positionInput: 'top' | 'bottom' | 'left' | 'right';
  @Input('text') textInput: string;

  public className: string;
  public isFocused: boolean;
  public isHovered: boolean;
  public position: 'top' | 'bottom' | 'left' | 'right';
  public text: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomTooltipComponent;

    this.text = this.textInput || defaultProps.text;
    this.position = this.positionInput || defaultProps.position;
    this.className = this.classNameInput || defaultProps.className;

    this.isFocused = defaultProps.isFocused;
    this.isHovered = defaultProps.isHovered;
  }

  onMouseEnter(event: Event) {
    this.isHovered = true;
  }

  onMouseLeave(event: Event) {
    this.isHovered = false;
  }

  onFocus(event: Event) {
    this.isFocused = true;
  }

  onBlur(event: Event) {
    this.isFocused = false;
  }
}
