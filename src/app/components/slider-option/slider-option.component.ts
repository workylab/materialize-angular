import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SliderOptionModel } from './slider-option.model';

@Component({
  selector: 'materialize-slider-option',
  styleUrls: ['./slider-option.component.scss'],
  templateUrl: './slider-option.component.html'
})
export class SliderOptionComponent implements OnInit {
  static readonly defaultProps: SliderOptionModel = {
    className: '',
    value: ''
  };

  @ViewChild('template') templateRef: ElementRef;
  @Input('className') classNameInput: string;
  @Input('value') valueInput: string;

  public className: string;
  public isActive: boolean;
  public value: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = SliderOptionComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.value = this.valueInput || defaultProps.value;

    this.isActive = false;
  }
}
