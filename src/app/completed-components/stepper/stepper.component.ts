import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { config } from '../../config';
import { StepComponent } from './step/step.component';
import { StepperModel } from './stepper.model';

@Component({
  selector: `${ config.components.prefix }-stepper }`,
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements StepperModel, AfterContentInit {
  static readonly defaultProps: StepperModel = {
    activeIndex: 0,
    className: '',
    showTicks: true
  };

  @Input() className: string = StepperComponent.defaultProps.className;
  @Input() activeIndex: number = StepperComponent.defaultProps.activeIndex;
  @Input() showTicks: boolean = StepperComponent.defaultProps.showTicks;

  @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

  public prefix = config.components.prefix;
  public isContentReady = true;

  constructor() {
    this.validateContent = this.validateContent.bind(this);
  }

  ngAfterContentInit() {
    this.validateContent();

    this.steps.changes.subscribe(this.validateContent);
  }

  validateContent() {
    setTimeout(() => {
      this.isContentReady = false;
      this.validateSteps();
    }, 0);
  }

  validateSteps() {
    this.steps.forEach((step, index) => {
      step.isCompleted = (index < this.activeIndex && this.showTicks);
    });
  }
}
