import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DRAWER_POSITIONS, DRAWER_TYPES, DrawerModel } from './drawer.model';
import { config } from '../../config';
import { DrawerCloseDirective } from '../../directives/drawer-close.directive';

@Component({
  selector: `${ config.components.prefix }-drawer }`,
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements AfterViewInit, AfterContentInit {
  static readonly defaultProps: DrawerModel = {
    className: '',
    closeOnBackdrop: true,
    hasBackdrop: true,
    isOpen: false,
    position: DRAWER_POSITIONS.LEFT,
    transitionDuration: 250,
    type: DRAWER_TYPES.OVER
  };

  @ContentChildren(DrawerCloseDirective, { descendants: true }) closeItems: QueryList<DrawerCloseDirective>;

  @ViewChild('backdrop', { static: true }) backdropRef: ElementRef;
  @ViewChild('drawer', { static: true }) drawerRef: ElementRef;

  @Output('onOpen') onOpenEmitter: EventEmitter<void>;
  @Output('onClose') onCloseEmitter: EventEmitter<void>;

  @Input() className: string = DrawerComponent.defaultProps.className;
  @Input() closeOnBackdrop: boolean = DrawerComponent.defaultProps.closeOnBackdrop;
  @Input() hasBackdrop: boolean = DrawerComponent.defaultProps.hasBackdrop;
  @Input() isOpen: boolean = DrawerComponent.defaultProps.isOpen;
  @Input() position: DRAWER_POSITIONS = DrawerComponent.defaultProps.position;
  @Input() transitionDuration: number = DrawerComponent.defaultProps.transitionDuration;
  @Input() type: DRAWER_TYPES = DrawerComponent.defaultProps.type;

  public prefix = config.components.prefix;

  constructor(private renderer: Renderer2) {
    this.close = this.close.bind(this);
    this.closeByBackdrop = this.closeByBackdrop.bind(this);
    this.registerCloseItems = this.registerCloseItems.bind(this);
    this.open = this.open.bind(this);

    this.onOpenEmitter = new EventEmitter<void>();
    this.onCloseEmitter = new EventEmitter<void>();
  }

  ngAfterContentInit() {
    this.registerCloseItems();

    this.closeItems.changes.subscribe(this.registerCloseItems);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.setStyle(this.drawerRef.nativeElement, 'transitionDuration', `${ this.transitionDuration }ms`);

      if (this.closeOnBackdrop) {
        this.backdropRef.nativeElement.addEventListener('click', this.closeByBackdrop);
      }
    }, 0);
  }

  registerCloseItems() {
    this.closeItems.forEach(item => {
      item.elementRef.nativeElement.addEventListener('click', this.close);
    });
  }

  open() {
    if (this.type !== DRAWER_TYPES.STATIC) {
      this.renderer.setStyle(this.backdropRef.nativeElement, 'display', 'block');

      setTimeout(() => {
        this.isOpen = true;
      }, 0);
    }
  }

  closeByBackdrop(event: Event) {
    if (event.target === this.backdropRef.nativeElement) {
      this.close();
    }
  }

  close() {
    this.isOpen = false;

    setTimeout(() => {
      this.renderer.setStyle(this.backdropRef.nativeElement, 'display', 'none');

      this.onCloseEmitter.emit();
    }, this.transitionDuration);
  }
}
