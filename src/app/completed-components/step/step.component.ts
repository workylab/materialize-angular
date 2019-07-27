import { Component, Input } from '@angular/core';
import { config } from '../../config';
import { StepModel } from './step.model';

@Component({
  selector: `${ config.components.prefix }-step }`,
  templateUrl: './step.component.html'
})
export class StepComponent implements StepModel {
  static readonly defaultProps: StepModel = {
    step: ''
  };

  @Input() step: string = StepComponent.defaultProps.step;

  public prefix = config.components.prefix;
}
