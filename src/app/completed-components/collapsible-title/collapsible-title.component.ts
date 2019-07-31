import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CollapsibleTitleModel } from './collapsible-title.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-collapsible-title }`,
  templateUrl: './collapsible-title.component.html'
})
export class CollapsibleTitleComponent implements CollapsibleTitleModel {
  static readonly defaultProps: CollapsibleTitleModel = {
    className: '',
    disabled: false,
    showIndicator: true
  };

  @Output('onClick') onClickEventEmitter: EventEmitter<void>;

  @Input() className: string = CollapsibleTitleComponent.defaultProps.className;
  @Input() disabled: boolean = CollapsibleTitleComponent.defaultProps.disabled;
  @Input() showIndicator: boolean = CollapsibleTitleComponent.defaultProps.showIndicator;

  public prefix = config.components.prefix;

  constructor() {
    this.onClickEventEmitter = new EventEmitter<void>();
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.onClickEventEmitter.emit();
  }
}
