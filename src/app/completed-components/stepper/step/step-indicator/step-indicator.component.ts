import { Component } from '@angular/core';
import { config } from '../../../../config';

@Component({
  selector: `${ config.components.prefix }-step-indicator`,
  templateUrl: './step-indicator.component.html'
})
export class StepIndicatorComponent {
  public prefix = config.components.prefix;
}
