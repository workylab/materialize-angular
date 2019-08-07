import { ButtonComponent } from './button.component';
import { NgModule } from '@angular/core';
import { RippleDirective } from '../../directives/ripple.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ButtonComponent,
    RippleDirective
  ],
  exports: [
    ButtonComponent,
    RippleDirective
  ],
  imports: [
    CommonModule
  ]
})
export class MaterializeButtonModule {
}
