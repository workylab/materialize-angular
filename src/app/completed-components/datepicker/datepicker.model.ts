/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { CalendarModel } from '../calendar/calendar.model';
import { InputModel } from '../input/input.model';

export interface DatePickerModel extends InputModel, CalendarModel {
  date: Date;
  format: string;
  fullSize: boolean;
}
