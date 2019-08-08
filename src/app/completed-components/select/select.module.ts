import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeIconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { SelectOptionComponent } from './select-option/select-option.component';

@NgModule({
  declarations: [
    SelectComponent,
    SelectOptionComponent
  ],
  exports: [
    SelectComponent,
    SelectOptionComponent
  ],
  imports: [
    CommonModule,
    MaterializeCommonModule,
    MaterializeIconModule
  ]
})
export class MaterializeSelectModule {
}
