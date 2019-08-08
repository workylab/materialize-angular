import { CommonModule } from '@angular/common';
import { LabelComponent } from './label.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LabelComponent],
  exports: [LabelComponent],
  imports: [CommonModule]
})
export class MaterializeLabelModule {
}
