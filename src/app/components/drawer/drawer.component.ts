import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { DRAWER_TYPE, DrawerModel } from './drawer.model';
import { DrawerCloseDirective } from '../../directives/drawer-close.directive';
import { DrawerHandlerComponent } from '../drawer-handler/drawer-handler.component';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'materialize-drawer',
  styleUrls: ['./drawer.component.scss'],
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements OnInit, AfterViewInit, AfterContentInit {
  static readonly defaultProps: DrawerModel = {
    className: '',
    closeOnBackdrop: true,
    hasBackdrop: true,
    isOpen: false,
    transitionDuration: 250,
    type: DRAWER_TYPE.OVER
  };

  @ContentChild(DrawerHandlerComponent) drawerHandler: DrawerHandlerComponent;
  @ContentChildren(DrawerCloseDirective, { descendants: true }) closeItems: QueryList<DrawerCloseDirective>;

  @ViewChild('backdrop') backdropRef: ElementRef;
  @ViewChild('drawer') drawerRef: ElementRef;

  @Output('onOpen') onOpenEmitter: EventEmitter<void>;
  @Output('onClose') onCloseEmitter: EventEmitter<void>;

  @Input('className') classNameInput: string;
  @Input('closeOnBackDrop') closeOnBackdropInput: boolean;
  @Input('hasBackdrop') hasBackdropInput: boolean;
  @Input('isOpen') isOpenInput: boolean;
  @Input('transitionDuration') transitionDurationInput: number;
  @Input('type') typeInput: DRAWER_TYPE;

  public className: string;
  public closeOnBackdrop: boolean;
  public hasBackdrop: boolean;
  public isOpen: boolean;
  public transitionDuration: number;
  public type: DRAWER_TYPE;

  constructor() {
    this.close = this.close.bind(this);
    this.closeByBackdrop = this.closeByBackdrop.bind(this);
    this.onHandlerClick = this.onHandlerClick.bind(this);

    this.onOpenEmitter = new EventEmitter();
    this.onCloseEmitter = new EventEmitter();
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterContentInit() {
    this.registerCloseItems();

    if (this.drawerHandler) {
      this.drawerHandler.onClickEmitter.subscribe(this.onHandlerClick);
    }

    this.closeItems.changes.subscribe(changes => {
      this.registerCloseItems();
    });
  }

  ngAfterViewInit() {
    this.drawerRef.nativeElement.style.transitionDuration = `${ this.transitionDuration }ms`;

    if (this.closeOnBackdrop) {
      this.backdropRef.nativeElement.addEventListener('click', this.closeByBackdrop);
    }
  }

  initValues() {
    const { defaultProps } = DrawerComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.closeOnBackdrop = getBooleanValue(this.closeOnBackdropInput, defaultProps.closeOnBackdrop);
    this.isOpen = getBooleanValue(this.isOpenInput, defaultProps.isOpen);
    this.hasBackdrop = getBooleanValue(this.hasBackdropInput, defaultProps.hasBackdrop);
    this.transitionDuration = this.transitionDurationInput || defaultProps.transitionDuration;
    this.type = this.typeInput || defaultProps.type;
  }

  registerCloseItems() {
    const closeItems = this.closeItems.toArray();

    for (const item of closeItems) {
      item.elementRef.nativeElement.addEventListener('click', this.close);
    }
  }

  onHandlerClick() {
    if (this.type !== DRAWER_TYPE.STATIC) {
      const { nativeElement: backdrop } = this.backdropRef;

      backdrop.style.display = 'block';

      setTimeout(() => {
        this.isOpen = true;
      }, 0);
    }
  }

  closeByBackdrop(event: Event) {
    const { target } = event;
    const { nativeElement } = this.backdropRef;

    if (target === nativeElement) {
      this.close();
    }
  }

  close() {
    const { nativeElement: backdrop } = this.backdropRef;

    this.isOpen = false;

    setTimeout(() => {
      backdrop.style.display = 'none';

      this.onCloseEmitter.emit();
    }, this.transitionDuration);
  }
}
