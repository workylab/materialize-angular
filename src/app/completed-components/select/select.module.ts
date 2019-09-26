/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeIconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { SelectOptionComponent } from './select-option/select-option.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectOptionComponent
  ],
  exports: [
    SelectComponent,
    SelectOptionComponent
  ],
  imports: [
    CommonModule,
    MaterializeCommonModule,
    MaterializeIconModule
  ]
})
export class MaterializeSelectModule {
}
