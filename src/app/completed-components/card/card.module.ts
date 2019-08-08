import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  imports: [CommonModule]
})
export class MaterializeCardModule {
}
