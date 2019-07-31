import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { CollapsibleModel } from './collapsible.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-collapsible }`,
  templateUrl: './collapsible.component.html'
})
export class CollapsibleComponent implements CollapsibleModel, AfterContentInit {
  static readonly defaultProps: CollapsibleModel = {
    className: '',
    disabled: false,
    isOpen: false,
    showIndicator: true
  };

  @Output('onClose') onCloseEmitter: EventEmitter<boolean>;
  @Output('onOpen') onOpenEmitter: EventEmitter<boolean>;

  @ViewChild('container', { static: true }) containerRef: ElementRef;

  @Input() className: string = CollapsibleComponent.defaultProps.className;
  @Input() disabled: boolean = CollapsibleComponent.defaultProps.disabled;
  @Input() isOpen: boolean = CollapsibleComponent.defaultProps.isOpen;
  @Input() showIndicator: boolean = CollapsibleComponent.defaultProps.showIndicator;

  public prefix = config.components.prefix;

  constructor(private renderer: Renderer2) {
    this.onCloseEmitter = new EventEmitter<boolean>();
    this.onOpenEmitter = new EventEmitter<boolean>();

    this.onToggle = this.onToggle.bind(this);
    this.update = this.update.bind(this);

    window.addEventListener('resize', this.update);
  }

  ngAfterContentInit() {
    if (this.isOpen) {
      setTimeout(() => {
        this.toggle();
      }, 300);
    }
  }

  onToggle() {
    if (!this.disabled && this.isOpen) {
      this.close();
      this.onCloseEmitter.emit();
    }

    if (!this.disabled && !this.isOpen) {
      this.open();
      this.onOpenEmitter.emit();
    }
  }

  update() {
    if (this.isOpen) {
      this.toggle();
    }
  }

  open() {
    this.isOpen = true;
    this.toggle();
  }

  close() {
    this.isOpen = false;
    this.toggle();
  }

  toggle() {
    const contentContainer: HTMLElement = this.containerRef.nativeElement;
    const maxHeight = this.isOpen
      ? contentContainer.scrollHeight
      : 0;

    this.renderer.setStyle(contentContainer, 'maxHeight', `${ maxHeight }px`);
  }
}
