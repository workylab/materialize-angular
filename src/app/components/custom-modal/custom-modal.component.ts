import {
  AfterContentChecked,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild
} from '@angular/core';
import { CustomModalCloseDirective } from '../../directives/modal-close.directive';
import { CustomModalContentDirective } from '../../directives/modal-content.directive';
import { CustomModalHandlerDirective } from '../../directives/modal-handler.directive';

@Component({
  selector: 'custom-modal',
  templateUrl: './custom-modal.component.html'
})
export class CustomModalComponent implements AfterContentChecked, OnDestroy {
  @ContentChild(CustomModalContentDirective) modalContentChild: CustomModalContentDirective;
  @ContentChild(CustomModalHandlerDirective) modalHandlerChild: CustomModalHandlerDirective;

  @ViewChild('modal') modalRef: ElementRef;
  @ViewChild('modalContent') modalContentRef: ElementRef;
  @ViewChild('backdrop') backdropRef: ElementRef;

  public closeElements: Array<CustomModalCloseDirective>;
  public transitionDuration = 400;

  constructor() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeByEvent = this.closeByEvent.bind(this);
  }

  ngOnInit() {
    this.backdropRef.nativeElement.addEventListener('click', this.closeByEvent);
  }

  ngAfterContentChecked() {
    this.closeElements = this.modalContentChild.closeItems.toArray();

    this.modalHandlerChild.elementRef.nativeElement.addEventListener('click', this.open);

    for (const item of this.closeElements) {
      item.elementRef.nativeElement.addEventListener('click', this.close);
    }
  }

  ngOnDestroy() {
    this.backdropRef.nativeElement.removeEventListener('click', this.closeByEvent);

    this.modalHandlerChild.elementRef.nativeElement.removeEventListener('click', this.close);

    for (const item of this.closeElements) {
      item.elementRef.nativeElement.removeEventListener('click', this.close);
    }
  }

  open() {
    this.backdropRef.nativeElement.style.transitionDuration = `${ this.transitionDuration }ms`;
    this.modalContentRef.nativeElement.style.transitionDuration = `${ this.transitionDuration }ms`;

    this.modalRef.nativeElement.classList.add('active');

    setTimeout(() => {
      this.backdropRef.nativeElement.classList.add('active');
      this.modalContentRef.nativeElement.classList.add('active');
    }, 0);
  }

  closeByEvent(event: Event) {
    const { target } = event;
    const { nativeElement } = this.backdropRef;

    if (target === nativeElement) {
      this.close();
    }
  }

  close() {
    this.backdropRef.nativeElement.classList.remove('active');
    this.modalContentRef.nativeElement.classList.remove('active');

    setTimeout(() => {
      this.modalRef.nativeElement.classList.remove('active');
    }, this.transitionDuration);
  }
}
