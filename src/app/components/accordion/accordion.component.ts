import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { AccordionModel } from './accordion.model';
import { CollapsibleComponent } from '../collapsible/collapsible.component';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-accordion }`,
  templateUrl: './accordion.component.html'
})
export class AccordionComponent implements AccordionModel, AfterContentInit, OnInit {
  static readonly defaultProps: AccordionModel = { className: '' };

  @ContentChildren(CollapsibleComponent) collapsiblesQueryList: QueryList<CollapsibleComponent>;

  @Output('onToggle') onToggleEmmiter: EventEmitter<number | null>;

  @Input('className') classNameInput: string;

  public activeIndex: number | null;
  public className: string;
  public collapsibles: Array<CollapsibleComponent>;

  constructor() {
    this.onToggleEmmiter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = AccordionComponent;

    this.className = this.classNameInput || defaultProps.className;
  }

  ngAfterContentInit() {
    this.collapsibles = this.collapsiblesQueryList.toArray();

    for (let i = 0; i < this.collapsibles.length; i++) {
      const currentCollapsible = this.collapsibles[i];

      currentCollapsible.onClickEventEmitter.subscribe((isOpen: boolean) => {
        this.toggleCollapsibles(i, isOpen);
      });
    }
  }

  toggleCollapsibles(index: number | null, isOpen: boolean) {
    this.activeIndex = isOpen
      ? index
      : null;

    this.onToggleEmmiter.emit(this.activeIndex);

    for (let i = 0; i < this.collapsibles.length; i++) {
      if (i === this.activeIndex) {
        this.collapsibles[i].toggleCollapsible(isOpen);
      } else {
        this.collapsibles[i].toggleCollapsible(false);
      }
    }
  }

  closeAll() {
    this.activeIndex = null;

    this.onToggleEmmiter.emit(this.activeIndex);

    this.collapsibles.forEach(item => {
      item.toggleCollapsible(false);
    });
  }
}
