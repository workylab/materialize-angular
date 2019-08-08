import { Component, TemplateRef, ViewChild } from '@angular/core';
import { config } from '../../../config';

@Component({
  selector: `${ config.components.prefix }-step }`,
  templateUrl: './step.component.html'
})
export class StepComponent {
  @ViewChild('labelTemplate', { static: false }) labelTemplate: TemplateRef<any>;
  @ViewChild('indicatorTemplate', { static: false }) indicatorTemplate: TemplateRef<any>;

  public prefix = config.components.prefix;

  public isCompleted: boolean;

  constructor() {
    this.isCompleted = false;
  }
}
