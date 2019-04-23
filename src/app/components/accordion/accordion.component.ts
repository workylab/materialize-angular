import { Component, Input, OnInit } from '@angular/core';
import { AccordionModel } from './accordion.model';
import { CollapsibleModel } from '../collapsible/collapsible.model';

@Component({
  selector: 'materialize-accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent implements AccordionModel, OnInit {
  static readonly defaultProps: AccordionModel = {
    className: '',
    items: []
  };

  @Input('items') itemsInput: Array<CollapsibleModel>;

  public className: string;
  public items: Array<CollapsibleModel>;
  public activeIndex: number;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = AccordionComponent;

    this.items = this.itemsInput || defaultProps.items;
    this.className = this.className || defaultProps.className;
  }

  onClick(isOpen: boolean, index: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (i === index) {
        this.items[i].isOpen = isOpen;
      } else {
        this.items[i].isOpen = false;
      }
    }
  }
}
