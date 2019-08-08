import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeFormMessageModule } from '../form-message/form-message.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [
    CommonModule,
    MaterializeCommonModule,
    MaterializeFormMessageModule
  ]
})
export class MaterializeInputModule {
}
