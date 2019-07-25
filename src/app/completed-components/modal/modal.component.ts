import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { config } from '../../config';
import { ModalCloseDirective } from '../../directives/modal-close.directive';
import { ModalModel } from './modal.model';

@Component({
  selector: `${ config.components.prefix }-modal }`,
  templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterViewInit, ModalModel {
  static readonly defaultProps: ModalModel = {
    className: '',
    dismissOnBackdrop: true,
    hasBackdrop: true,
    hasCloseButton: true,
    isOpen: false,
    transitionDuration: 400
  };

  @ContentChildren(ModalCloseDirective, { descendants: true }) closeElements: QueryList<ModalCloseDirective>;

  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('backdrop') backdropRef: ElementRef;

  @Output('onOpen') onOpenEmitter: EventEmitter<void>;
  @Output('onClose') onCloseEmitter: EventEmitter<void>;

  @Input() className: string = ModalComponent.defaultProps.className;
  @Input() dismissOnBackdrop: boolean = ModalComponent.defaultProps.dismissOnBackdrop;
  @Input() hasBackdrop: boolean = ModalComponent.defaultProps.hasBackdrop;
  @Input() hasCloseButton: boolean = ModalComponent.defaultProps.hasCloseButton;
  @Input() isOpen: boolean = ModalComponent.defaultProps.isOpen;
  @Input() transitionDuration: number = ModalComponent.defaultProps.transitionDuration;

  constructor() {
    this.onOpenEmitter = new EventEmitter();
    this.onCloseEmitter = new EventEmitter();

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeByBackdrop = this.closeByBackdrop.bind(this);
  }

  ngAfterViewInit() {
    if (this.hasBackdrop && this.dismissOnBackdrop) {
      this.backdropRef.nativeElement.addEventListener('click', this.closeByBackdrop);
    }

    this.setFunctionToCloseElements();

    this.closeElements.changes.subscribe(this.setFunctionToCloseElements);
  }

  setFunctionToCloseElements() {
    this.closeElements.forEach(item => {
      item.onClickEmitter.subscribe(this.close);
    });
  }

  closeByBackdrop(event: Event) {
    const { target } = event;
    const { nativeElement } = this.backdropRef;

    if (target === nativeElement) {
      this.close();
    }
  }

  open() {
    this.modalRef.nativeElement.style.transitionDuration = `${ this.transitionDuration }ms`;

    this.isOpen = true;
    this.onOpenEmitter.emit();
  }

  close() {
    this.modalRef.nativeElement.style.transitionDuration = `${ this.transitionDuration / 2 }ms`;

    this.isOpen = false;
    this.onCloseEmitter.emit();
  }
}
