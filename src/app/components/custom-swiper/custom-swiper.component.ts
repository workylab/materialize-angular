import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { CustomSwiper, CustomSwiperEvents } from './custom-swiper.model';
import { CustomSwiperItemComponent } from './custom-swiper-item/custom-swiper-item.component';
import { getBooleanValue } from '../../utils/get-boolean-value.util';

@Component({
  selector: 'custom-swiper',
  templateUrl: './custom-swiper.component.html'
})
export class CustomSwiperComponent implements AfterContentInit, CustomSwiper {
  static readonly defaultProps: CustomSwiper = {
    animationMs: 300,
    autoplayMs: 1000,
    className: '',
    displayControls: true,
    displayDots: true,
    isAutoplay: false,
    isCarousel: false,
    isChangePerPage: false,
    isReverse: false,
    itemSwipePercentAdjust: 5,
    maxSwipeOutPercent: 5
  };

  static readonly TOUCH_EVENTS: CustomSwiperEvents = {
    click: 'touchend',
    down: 'touchstart',
    move: 'touchmove',
    out: 'touchend',
    up: 'touchend'
  };

  static readonly MOUSE_EVENTS: CustomSwiperEvents = {
    click: 'click',
    down: 'mousedown',
    move: 'mousemove',
    out: 'mouseout',
    up: 'mouseup'
  };

  @ViewChild('swiperContainer') swiperContainerRef: ElementRef;
  @ViewChild('swiper') swiperRef: ElementRef;

  @ContentChildren(CustomSwiperItemComponent) itemsQuery: QueryList<CustomSwiperItemComponent>;

  @Output('onChange') onChangeEmitter: EventEmitter<number>;

  @Input('animationMs') animationMsInput: number;
  @Input('autoplayMs') autoplayMsInput: number;
  @Input('className') classNameInput: string;
  @Input('displayControls') displayControlsInput: boolean;
  @Input('displayDots') displayDotsInput: boolean;
  @Input('isAutoplay') isAutoplayInput: boolean;
  @Input('isCarousel') isCarouselInput: boolean;
  @Input('isChangePerPage') isChangePerPageInput: boolean;
  @Input('isReverse') isReverseInput: boolean;
  @Input('itemSwipePercentAdjust') itemSwipePercentAdjustInput: number;
  @Input('maxSwipeOutPercent') maxSwipeOutPercentInput: number;

  public animationMs: number;
  public autoplayMs: number;
  public className: string;
  public displayControls: boolean;
  public dots: Array<number> = [];
  public isAutoplay: boolean;
  public isCarousel: boolean;
  public isChangePerPage: boolean;
  public isReverse: boolean;
  public displayDots: boolean;
  public itemSwipePercentAdjust: number;
  public maxSwipeOutPercent: number;

  // private pages: number[];

  private firstPointX: number;
  private firstPointY: number;
  private initDistance: number;
  private interval: number;
  private lastIndexToDisplay: number;
  private traveledDistance: number;

  public container: HTMLElement;
  public index: number;
  public items: Array<HTMLElement>;
  public nextClonedItems: number;
  public prevClonedItems: number;
  public supportedEvents: CustomSwiperEvents;
  public swiper: HTMLElement;

  constructor() {
    this.onChangeEmitter = new EventEmitter();

    this.actionDown = this.actionDown.bind(this);
    this.actionUp = this.actionUp.bind(this);
    this.activateSwipe = this.activateSwipe.bind(this);
    this.animate = this.animate.bind(this);
    this.autoplay = this.autoplay.bind(this);
    this.cancelRedirect = this.cancelRedirect.bind(this);
    this.showNext = this.showNext.bind(this);
    this.showPrev = this.showPrev.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
    this.swipe = this.swipe.bind(this);
    this.update = this.update.bind(this);
  }

  supportTouchEvents() {
    return 'ontouchstart' in window;
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.initValues();
    }, 300);
  }

  initValues() {
    const { defaultProps } = CustomSwiperComponent;

    this.index = 0;
    this.initDistance = 0;
    this.traveledDistance = 0;

    this.supportedEvents = this.supportTouchEvents()
      ? CustomSwiperComponent.TOUCH_EVENTS
      : CustomSwiperComponent.MOUSE_EVENTS;

    this.animationMs = this.animationMsInput || defaultProps.animationMs;
    this.className = this.classNameInput || defaultProps.className;
    this.displayControls = getBooleanValue(this.displayControlsInput, defaultProps.displayControls);
    this.displayDots = getBooleanValue(this.displayDotsInput, defaultProps.displayDots);
    this.isAutoplay = getBooleanValue(this.isAutoplayInput, defaultProps.isAutoplay);
    this.isCarousel = getBooleanValue(this.isCarouselInput, defaultProps.isCarousel);
    this.isChangePerPage = getBooleanValue(this.isChangePerPageInput, defaultProps.isChangePerPage);
    this.isReverse = getBooleanValue(this.isReverseInput, defaultProps.isReverse);
    this.itemSwipePercentAdjust = this.itemSwipePercentAdjustInput || defaultProps.itemSwipePercentAdjust;
    this.maxSwipeOutPercent = this.maxSwipeOutPercentInput || defaultProps.maxSwipeOutPercent;

    this.swiper = this.swiperRef.nativeElement;
    this.container = this.swiperContainerRef.nativeElement;
    this.items = this.itemsQuery.toArray().map(item => item.swiperItemContainer);
    this.lastIndexToDisplay = this.getLastIndexToDisplay(this.items);

    // this.pages = this.getItemsPerPage();

    this.swiper.addEventListener(this.supportedEvents.down, this.actionDown);
    this.swiper.addEventListener(this.supportedEvents.click, this.cancelRedirect);

    window.addEventListener('resize', () => {
      setTimeout(this.update, 100);
    });

    if (this.displayDots) {
      this.createDots();
    }

    if (this.isCarousel) {
      this.createClones();

      if (this.isAutoplay) {
        this.startAutoplay();
      }
    }
  }

  update() {
    this.lastIndexToDisplay = this.getLastIndexToDisplay(this.items);

    // this.pages = this.getItemsPerPage();

    this.goToItem(this.index, false);

    if (this.displayDots) {
      this.createDots();
    }

    if (this.isCarousel) {
      this.createClones();
    }
  }

  animate(distance: number, velocity: number) {
    const translate = `translate3d(${ -1 * distance }px, 0px, 0px)`;

    this.container.style.transform = translate;
    this.container.style.transitionDuration = `${ velocity }ms`;
  }

  containerFullWidth(): number {
    return this.container.scrollWidth - this.container.offsetWidth;
  }

  autoplay() {
    this.swiper.removeEventListener(this.supportedEvents.out, this.autoplay);

    this.interval = window.setInterval(() => {
      if (this.isReverse) {
        this.showPrev();
      } else {
        this.showNext();
      }
    }, this.autoplayMs);
  }

  startAutoplay() {
    this.autoplay();

    this.swiper.addEventListener(this.supportedEvents.move, this.stopAutoplay);
  }

  stopAutoplay() {
    clearInterval(this.interval);

    this.swiper.addEventListener(this.supportedEvents.out, this.autoplay);
  }

  actionDown(downEvent: any) {
    if (!this.supportTouchEvents()) {
      // downEvent.preventDefault();
    }

    this.firstPointY = this.supportTouchEvents()
      ? downEvent.touches[0].clientY
      : downEvent.screenY;

    this.firstPointX = this.supportTouchEvents()
      ? downEvent.touches[0].clientX
      : downEvent.screenX;

    let transform = this.container.style.transform;

    if (transform) {
      transform = transform.split('(')[1];
      transform = transform.split(')')[0];
      transform = transform.split(',')[0];
      transform = transform.replace('-', '');
      transform = transform.replace('px', '');

      this.initDistance = Number(transform);
    } else {
      this.initDistance = 0;
    }

    this.swiper.addEventListener(this.supportedEvents.move, this.activateSwipe);
    this.swiper.addEventListener(this.supportedEvents.up, () => {
      this.swiper.removeEventListener(
        this.supportedEvents.move, this.activateSwipe
      );
    });
  }

  activateSwipe(moveEvent: any) {
    const distanceY = this.supportTouchEvents()
      ? moveEvent.touches[0].clientY
      : moveEvent.screenY;

    if (Math.abs(this.firstPointY - distanceY) < 10) {
      this.swiper.addEventListener(this.supportedEvents.move, this.swipe);
      this.swiper.addEventListener(this.supportedEvents.up, this.actionUp);
      this.swiper.removeEventListener(this.supportedEvents.move, this.activateSwipe);
    }
  }

  actionUp(upEvent: any) {
    const distanceEvent = this.supportTouchEvents()
      ? upEvent.changedTouches[0].clientX
      : upEvent.screenX;

    this.traveledDistance = this.firstPointX - distanceEvent;

    const distance = this.traveledDistance + this.initDistance;

    for (let i = 0; i <= this.lastIndexToDisplay; i++) {
      const ajustDistance = (this.items[i].offsetWidth * this.itemSwipePercentAdjust) / 100;
      const minDistance = this.traveledDistance > 0
        ? this.items[i].offsetLeft + ajustDistance
        : this.items[i].offsetLeft + this.items[i].offsetWidth - ajustDistance;

      if (minDistance > distance) {
        this.goToItem(i, true);

        break;
      }
    }

    this.swiper.removeEventListener(this.supportedEvents.move, this.swipe);
    this.swiper.removeEventListener(this.supportedEvents.up, this.actionUp);
  }

  swipe(moveEvent: any) {
    if (moveEvent.cancelable) {
      moveEvent.preventDefault();
    }

    const distanceEvent = this.supportTouchEvents()
      ? moveEvent.touches[0].clientX
      : moveEvent.screenX;

    let distance = this.firstPointX - distanceEvent + this.initDistance;
    const containerWidth = this.container.offsetWidth;
    const outRange = containerWidth / 100 * this.maxSwipeOutPercent;
    const minDistance = outRange * -1;
    const maxDistance = outRange + this.containerFullWidth();

    if (distance < minDistance) {
      distance = minDistance;
    } else if (distance > maxDistance) {
      distance = maxDistance;
    }

    this.animate(distance, 0);
  }

  getLastIndexToDisplay(items: Array<HTMLElement>): number {
    let distance = 0;
    const totalItems = items.length - 1;

    for (let i = totalItems; i >= 0; i--) {
      distance = distance + items[i].offsetWidth;

      if (i === totalItems && distance > this.container.offsetWidth) {
        return i;
      }

      if (distance > this.container.offsetWidth) {
        return i + 1;
      }

      if (distance === this.container.offsetWidth) {
        return i;
      }
    }

    return totalItems;
  }

  cancelRedirect(event: any) {
    const distanceEvent = this.supportTouchEvents()
      ? event.changedTouches[0].clientX
      : event.screenX;

    this.traveledDistance = this.firstPointX - distanceEvent;

    if (this.traveledDistance !== 0 && !this.supportTouchEvents()) {
      event.preventDefault();
    }
  }

  updateIndex(newIndex: number) {
    this.items[this.index].classList.remove('active');
    this.index = newIndex;
    this.items[newIndex].classList.add('active');
    this.onChangeEmitter.emit(this.index);
  }

  preventAutoplay(event: any) {
    if (event && this.isCarousel && this.supportTouchEvents()) {
      clearInterval(this.interval);

      this.autoplay();
    }
  }

  showPrev(event?: Event) {
    this.preventAutoplay(event);

    if (this.isChangePerPage) {
      // const currentPage = this.getPageByIndex(this.index);

      // this.goToPage(currentPage - 1);
    } else {
      this.goToItem(this.index - 1, true);
    }
  }

  showNext(event?: Event) {
    this.preventAutoplay(event);

    if (this.isChangePerPage) {
      // const page = this.getPageByIndex(this.index);

      // this.goToPage(page + 1);
    } else {
      this.goToItem(this.index + 1, true);
    }
  }

  cloneItem(index: number): HTMLElement {
    const clonedItem = this.items[index].cloneNode(true) as HTMLElement;

    clonedItem.classList.add('cloned');

    return clonedItem;
  }

  createClones() {
    this.deleteClones();

    this.items = Array.from(this.container.querySelectorAll('.swiper-item-wrapper'));

    this.nextClonedItems = this.cloneDisplayedItemsInFirstPage();
    this.prevClonedItems = this.cloneDisplayedItemsInLastPage();

    this.items = Array.from(this.container.querySelectorAll('.swiper-item-wrapper'));
    this.lastIndexToDisplay = this.getLastIndexToDisplay(this.items);

    // this.pages = this.getItemsPerPage();
    this.goToItem(this.prevClonedItems, false);
    this.createDots();
  }

  deleteClones() {
    const clons = this.container.querySelectorAll('.cloned');

    for (let i = 0; i < clons.length; i++) {
      const currentItem = clons[i] as HTMLElement;

      if (currentItem.parentNode) {
        currentItem.parentNode.removeChild(currentItem);
      }
    }
  }

  goToItem(index: number, hasAnimation: boolean) {
    const animationMs = hasAnimation
      ? this.animationMs
      : 0;

    if (index >= 0 && index <= this.lastIndexToDisplay) {
      this.updateIndex(index);
      this.animate(this.items[index].offsetLeft, animationMs);

      const realLastIndex = this.items.length - this.nextClonedItems;

      if (this.isCarousel && index >= realLastIndex) {
        this.moveToRealInit(index);
      } else if (this.isCarousel && index < this.prevClonedItems) {
        this.moveToRealEnd(index);
      }
    }

    if (index >= this.lastIndexToDisplay && !this.isCarousel) {
      this.updateIndex(this.lastIndexToDisplay);
      this.animate(this.containerFullWidth(), animationMs);
    }
  }

  moveToRealInit(index: number) {
    setTimeout(() => {
      const realLastIndex = this.items.length - this.nextClonedItems;
      const realCurrentIndex = index + this.prevClonedItems;
      const initIndex = realCurrentIndex - realLastIndex;

      this.updateIndex(initIndex);
      this.animate(this.items[initIndex].offsetLeft, 0);
    }, this.animationMs);
  }

  moveToRealEnd(index: number) {
    setTimeout(() => {
      const realLastIndex = this.items.length - this.nextClonedItems;
      const realCurrentIndex = this.prevClonedItems - index;
      const endIndex = realLastIndex - realCurrentIndex;

      this.updateIndex(endIndex);
      this.animate(this.items[endIndex].offsetLeft, 0);
    }, this.animationMs);
  }

  cloneDisplayedItemsInFirstPage(): number {
    let distance = 0;

    for (let i = 0; i < this.items.length; i++) {
      distance = distance + this.items[i].offsetWidth;

      this.container.appendChild(this.cloneItem(i));

      if (distance >= this.container.offsetWidth) {
        return i + 1;
      }
    }

    return this.items.length;
  }

  cloneDisplayedItemsInLastPage(): number {
    const totalItems = this.items.length - 1;
    let itemsCounter = 1;
    let distance = 0;

    for (let i = totalItems; i >= 0; i--) {
      distance = distance + this.items[i].offsetWidth;

      this.container.insertBefore(this.cloneItem(i), this.container.firstChild);

      if (distance >= this.container.offsetWidth) {
        return itemsCounter;
      }

      itemsCounter = itemsCounter + 1;
    }

    return totalItems;
  }

  onClickDot(index: number) {
    this.goToItem(index, true);
  }

  createDots() {
    this.dots = [];

    let firstDot = 0;
    let lastDot = 0;

    if (this.isChangePerPage) {
      //
    } else {
      firstDot = this.isCarousel
        ? this.prevClonedItems
        : 0;
      lastDot = this.isCarousel
        ? this.items.length - this.nextClonedItems
        : this.items.length;
    }

    for (let i = firstDot; i < lastDot; i++) {
      this.dots.push(i);
    }
  }

  // getItemsPerPage(): Array<number> {
  //   const pageItems = [];
  //   let distance = 0;
  //   let itemsCounter = 1;

  //   for (let i = 0; i < this.items.length; i++) {
  //     distance = distance + this.items[i].offsetWidth;

  //     if (distance > this.container.offsetWidth) {
  //       if (distance < this.container.offsetWidth + this.items.length) {
  //         pageItems.push(itemsCounter);
  //         distance = 0;
  //         itemsCounter = 0;
  //       } else {
  //         pageItems.push(itemsCounter - 1);
  //         distance = this.items[i].offsetWidth;
  //         itemsCounter = 1;
  //       }
  //     }

  //     if (i === this.items.length - 1 && itemsCounter > 0) {
  //       pageItems.push(itemsCounter);
  //     }

  //     itemsCounter++;
  //   }

  //   return pageItems;
  // }

  // goToPage(pageNumber: number) {
  //   let firstItemPage = 0;

  //   for (let i = 0; i < pageNumber; i++) {
  //     firstItemPage = firstItemPage + this.pages[i];
  //   }

  //   this.goToItem(firstItemPage, true);
  // }

  // getPageByIndex(index: number): number {
  //   let itemsInCurrentPage = 0;
  //   const nextIndex = index + 1;

  //   for (let i = 0; i < this.items.length; i++) {
  //     itemsInCurrentPage = itemsInCurrentPage + this.pages[i];

  //     if (itemsInCurrentPage >= nextIndex) {
  //       return i;
  //     }
  //   }

  //   return 0;
  // }
}
