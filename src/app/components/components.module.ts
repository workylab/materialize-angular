import { CommonModule } from '@angular/common';
import { CustomAutocompleteComponent } from './custom-autocomplete/custom-autocomplete.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { CustomFormGroupComponent } from './custom-form-group/custom-form-group.component';
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
    CustomAutocompleteComponent,
    CustomCheckboxComponent,
    CustomFormComponent,
    CustomFormGroupComponent,
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
    CustomAutocompleteComponent,
    CustomCheckboxComponent,
    CustomFormComponent,
    CustomFormGroupComponent,
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
