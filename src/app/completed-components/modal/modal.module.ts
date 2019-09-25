/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { MaterializeIconModule } from '../icon/icon.module';
import { ModalComponent } from './modal.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [
    CommonModule,
    MaterializeIconModule
  ]
})
export class MaterializeModalModule {
}
