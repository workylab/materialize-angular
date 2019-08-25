import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MaterializeCommonModule } from '../common/common.module';
import { MaterializeFormMessageModule } from '../form-message/form-message.module';
import { MaterializeIconModule } from 'materialize-angular/public_api';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [InputComponent],
  exports: [InputComponent],
  imports: [
    CommonModule,
    MaterializeCommonModule,
    MaterializeIconModule,
    MaterializeFormMessageModule
  ]
})
export class MaterializeInputModule {
}
