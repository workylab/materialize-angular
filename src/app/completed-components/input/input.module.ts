/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeFormMessageModule } from '../form-message/form-message.module';
import { MaterializeIconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [
    CommonModule,
    MaterializeCommonModule,
    MaterializeIconModule,
    MaterializeFormMessageModule
  ]
})
export class MaterializeInputModule {
}
