import { Component } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-step-content`,
  templateUrl: './step-content.component.html'
})
export class StepContentComponent {
  public prefix = config.components.prefix;
}
