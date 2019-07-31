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

  @Output('onClick') onClickEventEmitter: EventEmitter<boolean>;

  @ViewChild('container', { static: true }) containerRef: ElementRef;

  @Input() className: string = CollapsibleComponent.defaultProps.className;
  @Input() disabled: boolean = CollapsibleComponent.defaultProps.disabled;
  @Input() isOpen: boolean = CollapsibleComponent.defaultProps.isOpen;
  @Input() showIndicator: boolean = CollapsibleComponent.defaultProps.showIndicator;

  public prefix = config.components.prefix;

  constructor(private renderer: Renderer2) {
    this.onToggle = this.onToggle.bind(this);
    this.update = this.update.bind(this);

    window.addEventListener('resize', this.update);
  }

  ngAfterContentInit() {
    if (this.isOpen) {
      setTimeout(() => {
        this.toggle(true);
      }, 300);
    }
  }

  onToggle() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;

      this.toggle(this.isOpen);
      this.onClickEventEmitter.emit(this.isOpen);
    }
  }

  update() {
    const { maxHeight } = this.containerRef.nativeElement.style;

    if (maxHeight) {
      this.toggle(true);
    }
  }

  toggle(isOpen: boolean) {
    const contentContainer: HTMLElement = this.containerRef.nativeElement;
    const maxHeight = isOpen
      ? contentContainer.scrollHeight
      : 0;

    this.renderer.setStyle(contentContainer, 'maxHeight', `${ maxHeight }px`);
  }
}
