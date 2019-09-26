/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './datepicker.component';
import { MaterializeButtonModule } from '../button/button.module';
import { MaterializeCalendarModule } from '../calendar/calendar.module';
import { MaterializeIconModule } from '../icon/icon.module';
import { MaterializeInputModule } from '../input/input.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [DatePickerComponent],
  exports: [DatePickerComponent],
  imports: [
    CommonModule,
    MaterializeButtonModule,
    MaterializeCalendarModule,
    MaterializeIconModule,
    MaterializeInputModule
  ]
})
export class MaterializeDatePickerModule {
}
