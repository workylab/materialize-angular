import { CommonModule } from '@angular/common';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomTextAreaComponent } from './custom-textarea/custom-textarea.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomTextAreaComponent
  ],
  exports: [
    CustomInputComponent,
    CustomTextAreaComponent
  ],
  imports: [CommonModule]
})
export class ComponentsModule {}
