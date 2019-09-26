/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { MaterializeButtonModule } from '../button/button.module';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeIconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    MaterializeButtonModule,
    MaterializeCommonModule,
    MaterializeIconModule
  ]
})
export class MaterializeCalendarModule {
}
