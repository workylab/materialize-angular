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
