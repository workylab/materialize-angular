import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { config } from '../../config';
import { StepComponent } from '../step/step.component';
import { StepperModel } from './stepper.model';

@Component({
  selector: `${ config.components.prefix }-stepper }`,
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements StepperModel {
  static readonly defaultProps: StepperModel = {
    activeStep: '',
    className: ''
  };

  @Input() className: string = StepperComponent.defaultProps.className;
  @Input() activeStep: string = StepperComponent.defaultProps.activeStep;

  @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

  public prefix = config.components.prefix;
}
