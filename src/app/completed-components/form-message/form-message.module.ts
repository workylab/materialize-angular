import { CommonModule } from '@angular/common';
import { FormMessageComponent } from './form-message.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [FormMessageComponent],
  exports: [FormMessageComponent],
  imports: [CommonModule]
})
export class MaterializeFormMessageModule {
}
