/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CollapsibleComponent } from './collapsible.component';
import { CollapsibleContentComponent } from './collapsible-content/collapsible-content.component';
import { CollapsibleTitleComponent } from './collapsible-title/collapsible-title.component';
import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeIconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CollapsibleComponent,
    CollapsibleContentComponent,
    CollapsibleTitleComponent
  ],
  exports: [
    CollapsibleComponent,
    CollapsibleContentComponent,
    CollapsibleTitleComponent
  ],
  imports: [
    CommonModule,
    MaterializeIconModule,
    MaterializeCommonModule
  ]
})
export class MaterializeCollapsibleModule {
}
