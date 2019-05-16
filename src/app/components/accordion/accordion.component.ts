import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { AccordionModel } from './accordion.model';
import { CollapsibleComponent } from '../collapsible/collapsible.component';

@Component({
  selector: 'materialize-accordion',
  templateUrl: './accordion.component.html'
})
export class AccordionComponent implements AccordionModel, AfterContentInit, OnInit {
  static readonly defaultProps: AccordionModel = { className: '' };

  @ContentChildren(CollapsibleComponent) collapsibles: QueryList<CollapsibleComponent>;

  public className: string;
  public activeIndex: number;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = AccordionComponent;

    this.className = this.className || defaultProps.className;
  }

  ngAfterContentInit() {
    const collapsibles: Array<CollapsibleComponent> = this.collapsibles.toArray();

    for (let i = 0; i < collapsibles.length; i++) {
      const currentCollapsible = collapsibles[i];

      currentCollapsible.onClickEventEmitter.subscribe((isOpen: boolean) => {
        this.toggleCollapsibles(i, isOpen);
      });
    }
  }

  toggleCollapsibles(index: number, isOpen: boolean) {
    const collapsibles = this.collapsibles.toArray();

    for (let i = 0; i < collapsibles.length; i++) {
      if (i === index) {
        collapsibles[i].toggleCollapsible(isOpen);
      } else {
        collapsibles[i].toggleCollapsible(false);
      }
    }
  }
}
