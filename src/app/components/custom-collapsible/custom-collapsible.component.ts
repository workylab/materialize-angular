import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CustomCollapsible } from './custom-collapsible.model';

@Component({
  selector: 'custom-collapsible',
  templateUrl: './custom-collapsible.component.html'
})
export class CustomCollapsibleComponent implements CustomCollapsible, OnInit {
  static readonly defaultProps: CustomCollapsible = {
    className: '',
    content: '',
    iconName: '',
    isOpen: false,
    title: ''
  };

  @Input('className') classNameInput: string;
  @Input('content') contentInput: string;
  @Input('iconName') iconNameInput: string;
  @Input('title') titleInput: string;

  public className: string;
  public content: string;
  public iconName: string;
  public isOpen: boolean;
  public title: string;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomCollapsibleComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.content = this.contentInput || defaultProps.content;
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.isOpen = defaultProps.isOpen;
    this.title = this.titleInput || defaultProps.title;
  }

  toggle() {
    const { children } = this.element.nativeElement.firstChild;
    const contentContainer: HTMLElement = children[children.length - 1];

    if (contentContainer.style.maxHeight) {
      contentContainer.style.maxHeight = null;
      this.isOpen = false;
    } else {
      this.isOpen = true;
      contentContainer.style.maxHeight = `${ contentContainer.scrollHeight }px`;
    }
  }
}
