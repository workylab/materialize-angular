import { CommonModule } from '@angular/common';
import { MaterializeIconModule } from '../icon/icon.module';
import { ModalComponent } from './modal.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ModalComponent],
  exports: [ModalComponent],
  imports: [
    CommonModule,
    MaterializeIconModule
  ]
})
export class MaterializeModalModule {
}
