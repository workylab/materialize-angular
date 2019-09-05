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
