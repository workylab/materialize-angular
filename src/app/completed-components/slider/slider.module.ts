import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderComponent } from './slider.component';
import { SliderIndicatorComponent } from './slider-indicator/slider-indicator.component';
import { SliderOptionComponent } from './slider-option/slider-option.component';

@NgModule({
  declarations: [
    SliderComponent,
    SliderIndicatorComponent,
    SliderOptionComponent
  ],
  exports: [
    SliderComponent,
    SliderIndicatorComponent,
    SliderOptionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MaterializeSliderModule {
}
