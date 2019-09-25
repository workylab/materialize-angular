/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { LabelComponent } from './label.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LabelComponent],
  exports: [LabelComponent],
  imports: [CommonModule]
})
export class MaterializeLabelModule {
}
