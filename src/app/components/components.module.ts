import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionComponent } from './accordion/accordion.component';
import { ButtonComponent } from '../completed-components/button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ButtonToggleGroupComponent } from './button-toggle-group/button-toggle-group.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CardComponent } from '../completed-components/card/card.component';
import { CheckboxComponent } from '../completed-components/checkbox/checkbox.component';
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
import { FormMessageComponent } from '../completed-components/form-message/form-message.component';
import { GlossaryComponent } from '../completed-components/glossary/glossary.component.component';
import { GlossaryItemComponent } from '../completed-components/glossary-item/glossary-item.component';
import { HTMLVisualizerComponent } from '../completed-components/html-visualizer/html-visualizer.component';
import { IconComponent } from '../completed-components/icon/icon.component';
import { InputComponent } from '../completed-components/input/input.component';
import { LabelComponent } from '../completed-components/label/label.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ModalCloseDirective } from '../directives/modal-close.directive';
import { ModalComponent } from '../completed-components/modal/modal.component';
import { ModalHandlerComponent } from '../completed-components/modal-handler/modal-handler.component';
import { NavbarComponent } from '../completed-components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { PrefixDirective } from '../directives/prefix.directive';
import { RadioComponent } from '../completed-components/radio/radio.component';
import { RadioGroupComponent } from '../completed-components/radio-group/radio-group.component';
import { RippleDirective } from '../directives/ripple.directive';
import { RouterModule } from '@angular/router';
import { ScrollSpyComponent } from '../completed-components/scroll-spy/scroll-spy.component';
import { ScrollSpyItemComponent } from '../completed-components/scroll-spy-item/scroll-spy-item.component';
import { SelectComponent } from '../completed-components/select/select.component';
import { SelectOptionComponent } from '../completed-components/select-option/select-option.component';
import { SliderComponent } from '../completed-components/slider/slider.component';
import { SliderIndicatorComponent } from '../completed-components/slider-indicator/slider-indicator.component';
import { SliderOptionComponent } from '../completed-components/slider-option/slider-option.component';
import { StepComponent } from '../completed-components/step/step.component';
import { StepperComponent } from '../completed-components/stepper/stepper.component';
import { SuffixDirective } from '../directives/suffix.directive';
import { SwitchComponent } from '../completed-components/switch/switch.component';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TableComponent } from './table/table.component';
import { TextAreaComponent } from '../completed-components/textarea/textarea.component';
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
    GlossaryComponent,
    GlossaryItemComponent,
    HTMLVisualizerComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    ListComponent,
    ListItemComponent,
    ModalCloseDirective,
    ModalComponent,
    ModalHandlerComponent,
    NavbarComponent,
    PrefixDirective,
    SuffixDirective,
    RadioComponent,
    RadioGroupComponent,
    RippleDirective,
    ScrollSpyComponent,
    ScrollSpyItemComponent,
    SelectComponent,
    SelectOptionComponent,
    SliderComponent,
    SliderIndicatorComponent,
    SliderOptionComponent,
    StepComponent,
    StepperComponent,
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
    GlossaryComponent,
    GlossaryItemComponent,
    HTMLVisualizerComponent,
    IconComponent,
    InputComponent,
    LabelComponent,
    ListComponent,
    ListItemComponent,
    ModalCloseDirective,
    ModalComponent,
    ModalHandlerComponent,
    NavbarComponent,
    PrefixDirective,
    RadioComponent,
    RadioGroupComponent,
    RippleDirective,
    ScrollSpyComponent,
    ScrollSpyItemComponent,
    SelectComponent,
    SelectOptionComponent,
    SliderComponent,
    SliderIndicatorComponent,
    SliderOptionComponent,
    StepComponent,
    StepperComponent,
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
