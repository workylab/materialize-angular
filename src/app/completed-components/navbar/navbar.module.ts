import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule]
})
export class MaterializeNavbarModule {
}
