/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

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
