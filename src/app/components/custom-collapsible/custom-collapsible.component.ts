import { Component, ElementRef, Input, OnInit, Renderer2, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CustomCollapsible } from './custom-collapsible.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

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

  @Output('onClick') onClickEventEmitter: EventEmitter<boolean>;

  @Input('className') classNameInput: string;
  @Input('content') contentInput: string;
  @Input('iconName') iconNameInput: string;
  @Input('title') titleInput: string;
  @Input('isOpen') isOpenInput: boolean;

  public className: string;
  public content: string;
  public iconName: string;
  public isOpen: boolean;
  public title: string;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.onClickEventEmitter = new EventEmitter();
    this.onResizeWindow = this.onResizeWindow.bind(this);

    window.addEventListener('resize', this.onResizeWindow);
  }

  ngOnInit() {
    this.initValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { isOpenInput } = changes;

    if (isOpenInput && isOpenInput.currentValue !== isOpenInput.previousValue) {
      this.isOpen = isOpenInput.currentValue;
      this.toggleCollapsible(this.isOpen);
    }
  }

  initValues() {
    const { defaultProps } = CustomCollapsibleComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.content = this.contentInput || defaultProps.content;
    this.iconName = this.iconNameInput || defaultProps.iconName;
    this.isOpen = getBooleanValue(this.isOpenInput, defaultProps.isOpen);
    this.title = this.titleInput || defaultProps.title;
  }

  onResizeWindow() {
    if (this.isOpen) {
      this.toggleCollapsible(this.isOpen);
    }
  }

  onToggle() {
    this.isOpen = !this.isOpen;

    this.toggleCollapsible(this.isOpen);
    this.onClickEventEmitter.emit(this.isOpen);
  }

  toggleCollapsible(isOpen: boolean) {
    const { children } = this.element.nativeElement.firstChild;
    const contentContainer: HTMLElement = children[children.length - 1];

    if (isOpen) {
      this.renderer.setStyle(contentContainer, 'maxHeight', `${ contentContainer.scrollHeight }px`);
    } else {
      this.renderer.setStyle(contentContainer, 'maxHeight', null);
    }
  }
}
