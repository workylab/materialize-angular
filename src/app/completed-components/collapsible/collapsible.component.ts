import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CollapsibleContentComponent } from '../collapsible-content/collapsible-content.component';
import { CollapsibleModel } from './collapsible.model';
import { CollapsibleTitleComponent } from '../collapsible-title/collapsible-title.component';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-collapsible }`,
  templateUrl: './collapsible.component.html'
})
export class CollapsibleComponent implements AfterContentInit, CollapsibleModel, OnChanges {
  static readonly defaultProps: CollapsibleModel = {
    className: '',
    isOpen: false
  };

  @Output('onClick') onClickEventEmitter: EventEmitter<boolean>;

  @ContentChild(CollapsibleTitleComponent, { static: false }) title: CollapsibleTitleComponent;
  @ContentChild(CollapsibleContentComponent, { static: false }) content: CollapsibleContentComponent;

  @Input() className: string = CollapsibleComponent.defaultProps.className;
  @Input() isOpen: boolean = CollapsibleComponent.defaultProps.isOpen;

  public prefix = config.components.prefix;

  constructor() {
    this.onClickEventEmitter = new EventEmitter();

    this.onResizeWindow = this.onResizeWindow.bind(this);
    this.onToggle = this.onToggle.bind(this);

    window.addEventListener('resize', this.onResizeWindow);
  }

  ngAfterContentInit() {
    this.title.onClickEventEmitter.subscribe(this.onToggle);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onResizeWindow() {
    if (this.isOpen) {
      this.content.toggle(this.isOpen);
    }
  }

  onToggle() {
    this.isOpen = !this.isOpen;

    this.content.toggle(this.isOpen);
    this.onClickEventEmitter.emit(this.isOpen);
  }
}
