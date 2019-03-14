import { Component, Input, OnInit } from '@angular/core';
import { CustomAccordion } from './custom-accordion.model';
import { CustomCollapsible } from '../custom-collapsible/custom-collapsible.model';

@Component({
  selector: 'custom-accordion',
  templateUrl: './custom-accordion.component.html'
})
export class CustomAccordionComponent implements CustomAccordion, OnInit {
  static readonly defaultProps: CustomAccordion = {
    className: '',
    items: []
  };

  @Input('items') itemsInput: Array<CustomCollapsible>;

  public className: string;
  public items: Array<CustomCollapsible>;
  public activeIndex: number;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomAccordionComponent;

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
