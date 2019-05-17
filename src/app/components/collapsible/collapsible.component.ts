import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { CollapsibleModel } from './collapsible.model';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'materialize-collapsible',
  styleUrls: ['./collapsible.component.scss'],
  templateUrl: './collapsible.component.html'
})
export class CollapsibleComponent implements CollapsibleModel, OnInit {
  static readonly defaultProps: CollapsibleModel = {
    className: '',
    isOpen: false,
    title: ''
  };

  @Output('onClick') onClickEventEmitter: EventEmitter<boolean>;

  @Input('className') classNameInput: string;
  @Input('title') titleInput: string;
  @Input('isOpen') isOpenInput: boolean;

  public className: string;
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
      this.toggleCollapsible(isOpenInput.currentValue);
    }
  }

  initValues() {
    const { defaultProps } = CollapsibleComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.isOpen = getBooleanValue(this.isOpenInput, defaultProps.isOpen);
    this.title = this.titleInput || defaultProps.title;
  }

  onResizeWindow() {
    if (this.isOpen) {
      this.toggleCollapsible(true);
    }
  }

  onToggle() {
    this.toggleCollapsible(!this.isOpen);
    this.onClickEventEmitter.emit(this.isOpen);
  }

  toggleCollapsible(isOpen: boolean) {
    this.isOpen = isOpen;

    const { children } = this.element.nativeElement.firstChild;
    const contentContainer: HTMLElement = children[children.length - 1];

    if (isOpen) {
      this.renderer.setStyle(contentContainer, 'maxHeight', `${ contentContainer.scrollHeight }px`);
    } else {
      this.renderer.setStyle(contentContainer, 'maxHeight', null);
    }
  }
}
