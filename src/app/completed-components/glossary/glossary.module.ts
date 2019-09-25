/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { GlossaryComponent } from './glossary.component';
import { GlossaryItemComponent } from './glossary-item/glossary-item.component';
import { MaterializeScrollSpyModule } from '../scroll-spy/scroll-spy.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    GlossaryComponent,
    GlossaryItemComponent
  ],
  exports: [
    GlossaryComponent,
    GlossaryItemComponent
  ],
  imports: [
    CommonModule,
    MaterializeScrollSpyModule
  ]
})
export class MaterializeGlossaryModule {
}
