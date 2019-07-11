import { Component, Input, OnInit } from '@angular/core';
import { RangeSliderOptionModel } from './range-slider-option.model';

@Component({
  selector: 'materialize-range-slider-option',
  templateUrl: './range-slider-option.component.html'
})
export class RangeSliderOptionComponent implements OnInit {
  static readonly defaultProps: RangeSliderOptionModel = {
    value: ''
  };

  @Input('value') valueInput: string;

  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = RangeSliderOptionComponent;

    this.value = this.valueInput || defaultProps.value;
  }
}
