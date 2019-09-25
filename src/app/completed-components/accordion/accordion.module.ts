/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { AccordionComponent } from './accordion.component';
import { CommonModule } from '@angular/common';
import { MaterializeCollapsibleModule } from '../collapsible/collapsible.module';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AccordionComponent],
  exports: [AccordionComponent],
  imports: [
    MaterializeCollapsibleModule,
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeAccordionModule {
}
