import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-swiper-item',
  templateUrl: './custom-swiper-item.component.html'
})
export class CustomSwiperItemComponent implements OnInit {
  static readonly defaultProps = {
    className: ''
  };

  @ViewChild('swiperItemContainer') swiperItemContainerRef: ElementRef;

  @Input('className') classNameInput: string;

  public className: string;

  ngOnInit() {
    this.initValues();
  }

  initValues() {
    const { defaultProps } = CustomSwiperItemComponent;

    this.className = this.classNameInput || defaultProps.className;
  }

  get swiperItemContainer(): HTMLElement {
    return this.swiperItemContainerRef.nativeElement;
  }
}
