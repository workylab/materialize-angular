import { CommonModule } from '@angular/common';
import { CustomInput } from './custom-input/custom-input.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CustomInput],
  exports: [CustomInput],
  imports: [CommonModule]
})
export class ComponentsModule {}
