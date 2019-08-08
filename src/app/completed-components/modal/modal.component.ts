import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { config } from '../../config';
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

  @ViewChild('modal', { static: true }) modalRef: ElementRef;
  @ViewChild('backdrop', { static: false }) backdropRef: ElementRef;

  @Output('onOpen') onOpenEmitter: EventEmitter<void>;
  @Output('onClose') onCloseEmitter: EventEmitter<void>;

  @Input() className: string = ModalComponent.defaultProps.className;
  @Input() dismissOnBackdrop: boolean = ModalComponent.defaultProps.dismissOnBackdrop;
  @Input() hasBackdrop: boolean = ModalComponent.defaultProps.hasBackdrop;
  @Input() hasCloseButton: boolean = ModalComponent.defaultProps.hasCloseButton;
  @Input() isOpen: boolean = ModalComponent.defaultProps.isOpen;
  @Input() transitionDuration: number = ModalComponent.defaultProps.transitionDuration;

  public prefix = config.components.prefix;

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
