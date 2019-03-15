import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-swiper-item',
  templateUrl: './custom-swiper-item.component.html'
})
export class CustomSwiperItemComponent {
  @ViewChild('swiperItemContainer') swiperItemContainerRef: ElementRef;

  get swiperItemContainer(): HTMLElement {
    return this.swiperItemContainerRef.nativeElement;
  }
}
