/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';
import { ScrollSpyComponent } from './scroll-spy.component';
import { ScrollSpyItemComponent } from './scroll-spy-item/scroll-spy-item.component';

@NgModule({
  declarations: [
    ScrollSpyComponent,
    ScrollSpyItemComponent
  ],
  exports: [
    ScrollSpyComponent,
    ScrollSpyItemComponent
  ],
  imports: [
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeScrollSpyModule {
}
