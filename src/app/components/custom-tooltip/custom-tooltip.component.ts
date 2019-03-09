import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CustomTooltip } from './custom-tooltip.model';

@Component({
  selector: 'custom-tooltip',
  templateUrl: './custom-tooltip.component.html'
})
export class CustomTooltipComponent implements OnInit {
  static readonly defaultProps: CustomTooltip = {
    className: '',
    isFocused: false,
    position: 'top',
    text: ''
  };

  @Input('className') classNameInput: string;
  @Input('position') positionInput: 'top' | 'bottom' | 'left' | 'right';
  @Input('text') textInput: string;

  public className: string;
  public isFocused: boolean;
  public position: 'top' | 'bottom' | 'left' | 'right';
  public text: string;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterViewInit() {
    const { children } = this.element.nativeElement;
  }

  initValues() {
    const { defaultProps } = CustomTooltipComponent;

    this.text = this.textInput || defaultProps.text;
    this.position = this.positionInput || defaultProps.position;
    this.className = this.classNameInput || defaultProps.className;
    this.isFocused = defaultProps.isFocused;
  }

  onMouseEnter() {
    this.isFocused = true;
  }

  onMouseLeave() {
    this.isFocused = false;
  }
}
