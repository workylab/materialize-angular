import { CheckboxComponent } from './checkbox.component';
import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
  imports: [
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeCheckboxModule {
}
