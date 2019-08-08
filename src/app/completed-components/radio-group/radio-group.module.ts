import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';

@NgModule({
  declarations: [
    RadioComponent,
    RadioGroupComponent
  ],
  exports: [
    RadioComponent,
    RadioGroupComponent
  ],
  imports: [
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeRadioGroupModule {
}
