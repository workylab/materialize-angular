/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { HomeComponent } from './modules/home/home.component';
import { MaterializeAccordionModule } from './completed-components/accordion/accordion.module';
import { MaterializeButtonModule } from './completed-components/button/button.module';
import {
  MaterializeButtonToggleGroupModule
} from './completed-components/button-toggle-group/button-toggle-group.module';
import { MaterializeCalendarModule } from './completed-components/calendar/calendar.module';
import { MaterializeCardModule } from './completed-components/card/card.module';
import { MaterializeCheckboxModule } from './completed-components/checkbox/checkbox.module';
import { MaterializeCollapsibleModule } from './completed-components/collapsible/collapsible.module';
import { MaterializeCommonModule } from './completed-components/common/common.module';
import { MaterializeDatePickerModule } from './completed-components/datepicker/datepicker.module';
import { MaterializeDrawerModule } from './completed-components/drawer/drawer.module';
import { MaterializeFormMessageModule } from './completed-components/form-message/form-message.module';
import { MaterializeGlossaryModule } from './completed-components/glossary/glossary.module';
import { MaterializeHTMLVisualizerModule } from './completed-components/html-visualizer/html-visualizer.module';
import { MaterializeIconModule } from './completed-components/icon/icon.module';
import { MaterializeInputModule } from './completed-components/input/input.module';
import { MaterializeLabelModule } from './completed-components/label/label.module';
import { MaterializeModalModule } from './completed-components/modal/modal.module';
import { MaterializeNavbarModule } from './completed-components/navbar/navbar.module';
import { MaterializeRadioGroupModule } from './completed-components/radio-group/radio-group.module';
import { MaterializeScrollSpyModule } from './completed-components/scroll-spy/scroll-spy.module';
import { MaterializeSelectModule } from './completed-components/select/select.module';
import { MaterializeSliderModule } from './completed-components/slider/slider.module';
import { MaterializeStepperModule } from './completed-components/stepper/stepper.module';
import { MaterializeSwitchModule } from './completed-components/switch/switch.module';
import { MaterializeTabGroupModule } from './completed-components/tab-group/tab-group.module';
import { MaterializeTextAreaModule } from './completed-components/textarea/textarea.module';
import { NgModule } from '@angular/core';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ContactsComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterializeAccordionModule,
    MaterializeButtonModule,
    MaterializeButtonToggleGroupModule,
    MaterializeCalendarModule,
    MaterializeCardModule,
    MaterializeCheckboxModule,
    MaterializeCommonModule,
    MaterializeCollapsibleModule,
    MaterializeDatePickerModule,
    MaterializeFormMessageModule,
    MaterializeGlossaryModule,
    MaterializeIconModule,
    MaterializeDrawerModule,
    MaterializeHTMLVisualizerModule,
    MaterializeLabelModule,
    MaterializeInputModule,
    MaterializeModalModule,
    MaterializeNavbarModule,
    MaterializeRadioGroupModule,
    MaterializeScrollSpyModule,
    MaterializeStepperModule,
    MaterializeSelectModule,
    MaterializeSliderModule,
    MaterializeSwitchModule,
    MaterializeTabGroupModule,
    MaterializeTextAreaModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class AppModule {}
