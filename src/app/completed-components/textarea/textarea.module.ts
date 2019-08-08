import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeFormMessageModule } from '../form-message/form-message.module';
import { NgModule } from '@angular/core';
import { TextAreaComponent } from './textarea.component';

@NgModule({
  declarations: [TextAreaComponent],
  exports: [TextAreaComponent],
  imports: [
    CommonModule,
    MaterializeCommonModule,
    MaterializeFormMessageModule
  ]
})
export class MaterializeTextAreaModule {
}
