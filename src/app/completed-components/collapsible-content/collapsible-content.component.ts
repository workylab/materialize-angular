import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { CollapsibleComponent } from '../collapsible/collapsible.component';
import { CollapsibleContentModel } from './collapsible-content.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-collapsible-content }`,
  templateUrl: './collapsible-content.component.html'
})
export class CollapsibleContentComponent implements CollapsibleContentModel {
  static readonly defaultProps: CollapsibleContentModel = {
    className: ''
  };

  @ViewChild('container', { static: true }) containerRef: ElementRef;

  @Input() className: string = CollapsibleComponent.defaultProps.className;

  public prefix = config.components.prefix;

  constructor(private renderer: Renderer2) {
  }

  toggle(isOpen: boolean) {
    const contentContainer: HTMLElement = this.containerRef.nativeElement;
    const maxHeight = isOpen
      ? `${ contentContainer.scrollHeight }px`
      : null;

    this.renderer.setStyle(contentContainer, 'maxHeight', maxHeight);
  }
}
