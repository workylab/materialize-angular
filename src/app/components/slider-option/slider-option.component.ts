import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { config } from '../../config';
import { SliderOptionModel } from './slider-option.model';

@Component({
  selector: `${ config.components.prefix }-slider-option }`,
  styleUrls: ['./slider-option.component.scss'],
  templateUrl: './slider-option.component.html'
})
export class SliderOptionComponent implements OnInit {
  static readonly defaultProps: SliderOptionModel = {
    className: '',
    value: null
  };

  @ViewChild('template') templateRef: ElementRef;
  @Input('className') classNameInput: string;
  @Input('value') valueInput: number | string | boolean | null;

  public className: string;
  public isActive: boolean;
  public value: number | string | boolean | null;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SliderOptionComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.value = typeof this.valueInput === 'undefined'
      ? defaultProps.value
      : this.valueInput;

    this.isActive = false;
  }
}
