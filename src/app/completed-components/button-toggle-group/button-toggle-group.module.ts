import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ButtonToggleGroupComponent } from './button-toggle-group.component';
import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ButtonToggleComponent,
    ButtonToggleGroupComponent
  ],
  exports: [
    ButtonToggleComponent,
    ButtonToggleGroupComponent
  ],
  imports: [
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeButtonToggleGroupModule {
}
