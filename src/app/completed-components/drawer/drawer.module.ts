/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent
  ],
  exports: [
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MaterializeDrawerModule {
}
