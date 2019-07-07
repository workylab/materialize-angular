import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionComponent } from './accordion/accordion.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { CollapsibleContentComponent } from './collapsible-content/collapsible-content.component';
import { CollapsibleTitleComponent } from './collapsible-title/collapsible-title.component';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { DivTreeComponent } from './div-tree/div-tree.component';
import { DrawerCloseDirective } from '../directives/drawer-close.directive';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { DrawerHandlerComponent } from './drawer-handler/drawer-handler.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormComponent } from './form/form.component';
import { FormFieldDirective } from '../directives/form-field.directive';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormMessageComponent } from './form-message/form-message.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { InputFileComponent } from './input-file/input-file.component';
import { LabelComponent } from './label/label.component';
import { ModalCloseDirective } from '../directives/modal-close.directive';
import { ModalComponent } from './modal/modal.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalHandlerComponent } from './modal-handler/modal-handler.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PrefixDirective } from '../directives/prefix.directive';
import { RadioComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { RippleDirective } from '../directives/ripple.directive';
import { RouterModule } from '@angular/router';
import { SelectComponent } from './select/select.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SuffixDirective } from '../directives/suffix.directive';
import { SwiperComponent } from './swiper/swiper.component';
import { SwiperItemComponent } from './swiper-item/swiper-item.component';
import { SwitchComponent } from './switch/switch.component';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TableComponent } from './table/table.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    AccordionComponent,
    AutocompleteComponent,
    ButtonComponent,
    ButtonToggleComponent,
    CalendarComponent,
    CheckboxComponent,
    CheckboxListComponent,
    CollapsibleComponent,
    CollapsibleContentComponent,
    CollapsibleTitleComponent,
    DatePickerComponent,
    DivTreeComponent,
    DrawerCloseDirective,
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent,
    DrawerHandlerComponent,
    DropdownComponent,
    FormComponent,
    FormFieldDirective,
    FormGroupComponent,
    FormMessageComponent,
    IconComponent,
    InputComponent,
    InputFileComponent,
    LabelComponent,
    ModalCloseDirective,
    ModalComponent,
    ModalContentComponent,
    ModalHandlerComponent,
    NavbarComponent,
    PrefixDirective,
    SuffixDirective,
    RadioComponent,
    RadioGroupComponent,
    RangeSliderComponent,
    RippleDirective,
    SelectComponent,
    SelectOptionComponent,
    SwiperComponent,
    SwiperItemComponent,
    SwitchComponent,
    TabComponent,
    TabGroupComponent,
    TableComponent,
    TextAreaComponent,
    TooltipComponent
  ],
  exports: [
    AccordionComponent,
    AutocompleteComponent,
    ButtonComponent,
    ButtonToggleComponent,
    CalendarComponent,
    CheckboxComponent,
    CheckboxListComponent,
    CollapsibleComponent,
    CollapsibleContentComponent,
    CollapsibleTitleComponent,
    DatePickerComponent,
    DivTreeComponent,
    DrawerCloseDirective,
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent,
    DrawerHandlerComponent,
    DropdownComponent,
    FormComponent,
    FormFieldDirective,
    FormGroupComponent,
    FormMessageComponent,
    IconComponent,
    InputComponent,
    InputFileComponent,
    LabelComponent,
    ModalCloseDirective,
    ModalComponent,
    ModalContentComponent,
    ModalHandlerComponent,
    NavbarComponent,
    PrefixDirective,
    RadioComponent,
    RadioGroupComponent,
    RangeSliderComponent,
    RippleDirective,
    SelectComponent,
    SelectOptionComponent,
    SuffixDirective,
    SwiperComponent,
    SwiperItemComponent,
    SwitchComponent,
    TabComponent,
    TabGroupComponent,
    TableComponent,
    TextAreaComponent,
    TooltipComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class MaterializeComponentsModule {}
