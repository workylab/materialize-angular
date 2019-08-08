import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';
import { SwitchComponent } from './switch.component';

@NgModule({
  declarations: [SwitchComponent],
  exports: [SwitchComponent],
  imports: [
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeSwitchModule {
}
