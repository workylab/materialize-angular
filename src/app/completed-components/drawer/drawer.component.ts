/**
 * @license
 * Copyright Workylab. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/workylab/materialize-angular/master/LICENSE
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { DRAWER_POSITIONS, DRAWER_TYPES, DrawerModel } from './drawer.model';
import { config } from '../../config';

@Component({
  selector: `${ config.components.prefix }-drawer }`,
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements AfterViewInit {
  static readonly defaultProps: DrawerModel = {
    className: '',
    closeOnBackdrop: true,
    hasBackdrop: true,
    isOpen: false,
    position: DRAWER_POSITIONS.LEFT,
    transitionDuration: 250,
    type: DRAWER_TYPES.OVER
  };

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
    this.open = this.open.bind(this);

    this.onOpenEmitter = new EventEmitter<void>();
    this.onCloseEmitter = new EventEmitter<void>();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.setStyle(this.drawerRef.nativeElement, 'transitionDuration', `${ this.transitionDuration }ms`);

      if (this.closeOnBackdrop) {
        this.backdropRef.nativeElement.addEventListener('click', this.closeByBackdrop);
      }
    }, 0);
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
