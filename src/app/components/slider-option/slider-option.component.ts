import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SliderOptionModel } from './slider-option.model';

@Component({
  selector: 'materialize-slider-option',
  templateUrl: './slider-option.component.html'
})
export class SliderOptionComponent implements OnInit {
  static readonly defaultProps: SliderOptionModel = {
    value: ''
  };

  @Input('value') valueInput: string;

  public value: string;

  constructor(public element: ElementRef) {
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SliderOptionComponent;

    this.value = this.valueInput || defaultProps.value;
  }
}
