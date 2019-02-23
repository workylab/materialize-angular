import { CommonModule } from '@angular/common';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { CustomTextAreaComponent } from './custom-textarea/custom-textarea.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CustomCheckboxComponent,
    CustomInputComponent,
    CustomTableComponent,
    CustomTextAreaComponent
  ],
  exports: [
    CustomCheckboxComponent,
    CustomInputComponent,
    CustomTableComponent,
    CustomTextAreaComponent
  ],
  imports: [CommonModule]
})
export class ComponentsModule {}
