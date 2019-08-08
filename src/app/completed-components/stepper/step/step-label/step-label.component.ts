import { Component } from '@angular/core';
import { config } from '../../../../config';

@Component({
  selector: `${ config.components.prefix }-step-label`,
  templateUrl: './step-label.component.html'
})
export class StepLabelComponent {
  public prefix = config.components.prefix;
}
