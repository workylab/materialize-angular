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
import { CustomModal } from './custom-modal.model';
import { CustomModalCloseDirective } from '../../directives/modal-close.directive';
import { CustomModalContentDirective } from '../../directives/modal-content.directive';
import { CustomModalHandlerDirective } from '../../directives/modal-handler.directive';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-modal',
  templateUrl: './custom-modal.component.html'
})
export class CustomModalComponent implements AfterContentChecked, AfterViewInit, CustomModal, OnDestroy {
  static readonly defaultProps: CustomModal = {
    className: '',
    dismissOnBackdrop: true,
    hasBackdrop: true,
    hasCloseButton: true,
    transitionDuration: 400
  };

  @ContentChild(CustomModalContentDirective) modalContentChild: CustomModalContentDirective;
  @ContentChild(CustomModalHandlerDirective) modalHandlerChild: CustomModalHandlerDirective;

  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('backdrop') backdropRef: ElementRef;

  @Input('className') classNameInput: string;
  @Input('dismissOnBackdrop') dismissOnBackdropInput: boolean;
  @Input('hasBackdrop') hasBackdropInput: boolean;
  @Input('hasCloseButton') hasCloseButtonInput: boolean;
  @Input('transitionDuration') transitionDurationInput: number;

  public closeElements: Array<CustomModalCloseDirective>;

  public className: string;
  public dismissOnBackdrop: boolean;
  public hasBackdrop: boolean;
  public hasCloseButton: boolean;
  public transitionDuration: number;

  constructor() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeByBackdrop = this.closeByBackdrop.bind(this);
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
    this.closeElements = this.modalContentChild.closeItems.toArray();

    this.modalHandlerChild.elementRef.nativeElement.addEventListener('click', this.open);

    for (const item of this.closeElements) {
      item.elementRef.nativeElement.addEventListener('click', this.close);
    }
  }

  ngOnDestroy() {
    this.modalHandlerChild.elementRef.nativeElement.removeEventListener('click', this.close);

    if (this.hasBackdrop && this.dismissOnBackdrop) {
      this.backdropRef.nativeElement.removeEventListener('click', this.closeByBackdrop);
    }

    for (const item of this.closeElements) {
      item.elementRef.nativeElement.removeEventListener('click', this.close);
    }
  }

  initValues() {
    const { defaultProps } = CustomModalComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.dismissOnBackdrop = getBooleanValue(this.dismissOnBackdropInput, defaultProps.dismissOnBackdrop);
    this.hasBackdrop = getBooleanValue(this.hasBackdropInput, defaultProps.hasBackdrop);
    this.hasCloseButton = getBooleanValue(this.hasCloseButtonInput, defaultProps.hasCloseButton);
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
    this.modalRef.nativeElement.classList.add('active');
  }

  close() {
    this.modalRef.nativeElement.style.transitionDuration = `${ this.transitionDuration / 2 }ms`;
    this.modalRef.nativeElement.classList.remove('active');
  }
}
