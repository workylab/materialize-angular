import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { getBooleanValue } from '../../utils/get-boolean-value.util';
import { ModalCloseDirective } from '../../directives/modal-close.directive';
import { ModalContentDirective } from '../../directives/modal-content.directive';
import { ModalHandlerDirective } from '../../directives/modal-handler.directive';
import { ModalModel } from './modal.model';

@Component({
  selector: 'materialize-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html'
})
export class ModalComponent implements AfterContentChecked, AfterViewInit, ModalModel, OnDestroy {
  static readonly defaultProps: ModalModel = {
    className: '',
    dismissOnBackdrop: true,
    hasBackdrop: true,
    hasCloseButton: true,
    isOpen: false,
    transitionDuration: 400
  };

  @ContentChild(ModalContentDirective) modalContent: ModalContentDirective;
  @ContentChild(ModalHandlerDirective) modalHandler: ModalHandlerDirective;

  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('modalContent') modalContentRef: ElementRef;
  @ViewChild('backdrop') backdropRef: ElementRef;

  @Input('className') classNameInput: string;
  @Input('dismissOnBackdrop') dismissOnBackdropInput: boolean;
  @Input('hasBackdrop') hasBackdropInput: boolean;
  @Input('hasCloseButton') hasCloseButtonInput: boolean;
  @Input('isOpen') isOpenInput: boolean;
  @Input('transitionDuration') transitionDurationInput: number;

  public closeElements: Array<ModalCloseDirective>;

  public className: string;
  public dismissOnBackdrop: boolean;
  public hasBackdrop: boolean;
  public hasCloseButton: boolean;
  public isOpen: boolean;
  public transitionDuration: number;

  constructor() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeByBackdrop = this.closeByBackdrop.bind(this);

    this.closeElements = [];
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterViewInit() {
    if (this.hasBackdrop && this.dismissOnBackdrop) {
      this.backdropRef.nativeElement.addEventListener('click', this.closeByBackdrop);
    }
  }

  ngAfterContentChecked() {
    if (this.modalHandler) {
      this.modalHandler.elementRef.nativeElement.addEventListener('click', this.open);
    }

    if (this.modalContent) {
      this.closeElements = this.modalContent.closeItems.toArray();
    }

    for (const item of this.closeElements) {
      item.elementRef.nativeElement.addEventListener('click', this.close);
    }
  }

  ngOnDestroy() {
    if (this.modalHandler) {
      this.modalHandler.elementRef.nativeElement.removeEventListener('click', this.close);
    }

    if (this.hasBackdrop && this.dismissOnBackdrop) {
      this.backdropRef.nativeElement.removeEventListener('click', this.closeByBackdrop);
    }

    for (const item of this.closeElements) {
      item.elementRef.nativeElement.removeEventListener('click', this.close);
    }
  }

  initValues() {
    const { defaultProps } = ModalComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.dismissOnBackdrop = getBooleanValue(this.dismissOnBackdropInput, defaultProps.dismissOnBackdrop);
    this.hasBackdrop = getBooleanValue(this.hasBackdropInput, defaultProps.hasBackdrop);
    this.hasCloseButton = getBooleanValue(this.hasCloseButtonInput, defaultProps.hasCloseButton);
    this.isOpen = getBooleanValue(this.isOpenInput, defaultProps.isOpen);
    this.transitionDuration = this.transitionDurationInput || defaultProps.transitionDuration;
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
  }

  close() {
    this.modalRef.nativeElement.style.transitionDuration = `${ this.transitionDuration / 2 }ms`;

    this.isOpen = false;
  }
}
