import { CommonModule } from '@angular/common';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomNavbarComponent } from './custom-navbar/custom-navbar.component';
import { CustomRadioComponent } from './custom-radio/custom-radio.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CustomSideNavComponent } from './custom-sidenav/custom-sidenav.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { CustomTextAreaComponent } from './custom-textarea/custom-textarea.component';
import { DivTreeComponent } from './div-tree/div-tree.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    CustomCheckboxComponent,
    CustomIconComponent,
    CustomInputComponent,
    CustomNavbarComponent,
    CustomRadioComponent,
    CustomSelectComponent,
    CustomSideNavComponent,
    CustomTableComponent,
    CustomTextAreaComponent,
    DivTreeComponent
  ],
  exports: [
    CustomCheckboxComponent,
    CustomIconComponent,
    CustomInputComponent,
    CustomNavbarComponent,
    CustomRadioComponent,
    CustomSelectComponent,
    CustomSideNavComponent,
    CustomTableComponent,
    CustomTextAreaComponent,
    DivTreeComponent
  ],
  imports: [CommonModule]
})
export class ComponentsModule {}
