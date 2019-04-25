import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'materialize-range-slider',
  styleUrls: ['./range-slider.component.scss'],
  templateUrl: './range-slider.component.html'
})
export class RangeSliderComponent {
  @ViewChild('rangeSlider') rangeSlider: ElementRef;
}
