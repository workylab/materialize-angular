import { CommonModule } from '@angular/common';
import { MaterializeIconModule } from '../icon/icon.module';
import { NgModule } from '@angular/core';
import { StepComponent } from './step/step.component';
import { StepIndicatorComponent } from './step/step-indicator/step-indicator.component';
import { StepLabelComponent } from './step/step-label/step-label.component';
import { StepperComponent } from './stepper.component';

@NgModule({
  declarations: [
    StepComponent,
    StepIndicatorComponent,
    StepLabelComponent,
    StepperComponent
  ],
  exports: [
    StepComponent,
    StepIndicatorComponent,
    StepLabelComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    MaterializeIconModule
  ]
})
export class MaterializeStepperModule {
}
