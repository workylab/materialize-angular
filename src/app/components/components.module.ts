import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionComponent } from './accordion/accordion.component';
import { ButtonComponent } from '../completed-components/button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CardComponent } from '../completed-components/card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { CollapsibleContentComponent } from './collapsible-content/collapsible-content.component';
import { CollapsibleTitleComponent } from './collapsible-title/collapsible-title.component';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { DrawerCloseDirective } from '../directives/drawer-close.directive';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerContainerComponent } from './drawer-container/drawer-container.component';
import { DrawerContentComponent } from './drawer-content/drawer-content.component';
import { DrawerHandlerComponent } from './drawer-handler/drawer-handler.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormMessageComponent } from './form-message/form-message.component';
import { IconComponent } from '../completed-components/icon/icon.component';
import { InputComponent } from './input/input.component';
import { LabelComponent } from '../completed-components/label/label.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ModalCloseDirective } from '../directives/modal-close.directive';
import { ModalComponent } from './modal/modal.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalHandlerComponent } from './modal-handler/modal-handler.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PrefixDirective } from '../directives/prefix.directive';
import { RadioComponent } from '../completed-components/radio/radio.component';
import { RadioGroupComponent } from '../completed-components/radio-group/radio-group.component';
import { RippleDirective } from '../directives/ripple.directive';
import { RouterModule } from '@angular/router';
import { SelectComponent } from './select/select.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SliderComponent } from './slider/slider.component';
import { SliderIndicatorComponent } from './slider-indicator/slider-indicator.component';
import { SliderOptionComponent } from './slider-option/slider-option.component';
import { SuffixDirective } from '../directives/suffix.directive';
import { SwitchComponent } from '../completed-components/switch/switch.component';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TableComponent } from './table/table.component';
import { TextAreaComponent } from './textarea/textarea.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    AccordionComponent,
    ButtonComponent,
    ButtonToggleComponent,
    ButtonToggleGroupComponent,
    CalendarComponent,
    CardComponent,
    CheckboxComponent,
    CheckboxListComponent,
    CollapsibleComponent,
    CollapsibleContentComponent,
    CollapsibleTitleComponent,
    DatePickerComponent,
    DrawerCloseDirective,
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent,
    DrawerHandlerComponent,
    DropdownComponent,
    FormMessageComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    ListComponent,
    ListItemComponent,
    ModalCloseDirective,
    ModalComponent,
    ModalContentComponent,
    ModalHandlerComponent,
    NavbarComponent,
    PrefixDirective,
    SuffixDirective,
    RadioComponent,
    RadioGroupComponent,
    RippleDirective,
    SelectComponent,
    SelectOptionComponent,
    SliderComponent,
    SliderIndicatorComponent,
    SliderOptionComponent,
    SwitchComponent,
    TabComponent,
    TabGroupComponent,
    TableComponent,
    TextAreaComponent,
    TooltipComponent
  ],
  exports: [
    AccordionComponent,
    ButtonComponent,
    ButtonToggleComponent,
    ButtonToggleGroupComponent,
    CalendarComponent,
    CardComponent,
    CheckboxComponent,
    CheckboxListComponent,
    CollapsibleComponent,
    CollapsibleContentComponent,
    CollapsibleTitleComponent,
    DatePickerComponent,
    DrawerCloseDirective,
    DrawerComponent,
    DrawerContainerComponent,
    DrawerContentComponent,
    DrawerHandlerComponent,
    DropdownComponent,
    FormMessageComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    ListComponent,
    ListItemComponent,
    ModalCloseDirective,
    ModalComponent,
    ModalContentComponent,
    ModalHandlerComponent,
    NavbarComponent,
    PrefixDirective,
    RadioComponent,
    RadioGroupComponent,
    RippleDirective,
    SelectComponent,
    SelectOptionComponent,
    SliderComponent,
    SliderIndicatorComponent,
    SliderOptionComponent,
    SuffixDirective,
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
