import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import { CustomSwiperEvents, CustomSwiperOptions } from './custom-swiper.model';
import { CustomSwiperItemComponent } from './custom-swiper-item/custom-swiper-item.component';

@Component({
  selector: 'custom-swiper',
  templateUrl: './custom-swiper.component.html'
})
export class CustomSwiperComponent implements AfterContentInit {
  static readonly SWIPE_OUT_PERCENT: number = 10;
  static readonly SWIPE_PERCENT_ADJUST: number = 10;

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

  @ContentChildren(CustomSwiperItemComponent) itemsQuery: QueryList<CustomSwiperItemComponent>;
  @Output('onChange') onChangeEmitter: EventEmitter<number>;
  @ViewChild('swiperContainer') swiperContainerRef: ElementRef;
  @ViewChild('swiper') swiperRef: ElementRef;

  // private dots: Array<number> = [];
  // private pages: number[];

  private container: HTMLElement;
  private firstPointX: number;
  private firstPointY: number;
  private index: number;
  private initDistance: number;
  private interval: number;
  private items: Array<HTMLElement>;
  private lastIndexToDisplay: number;
  private supportedEvents: CustomSwiperEvents;
  private swiper: HTMLElement;
  private traveledDistance: number;
  private options: CustomSwiperOptions = {
    animationMs: 300,
    autoplayMs: 1000,
    changePerPage: false,
    loop: false,
    reverse: false,
    showDots: false
  };

  public prevClonedItems: number;
  public nextClonedItems: number;

  constructor() {
    this.actionDown = this.actionDown.bind(this);
    this.actionUp = this.actionUp.bind(this);
    this.activateSwipe = this.activateSwipe.bind(this);
    this.animate = this.animate.bind(this);
    this.showPrev = this.showPrev.bind(this);
    this.showNext = this.showNext.bind(this);
    this.swipe = this.swipe.bind(this);
    this.update = this.update.bind(this);
    this.cancelRedirect = this.cancelRedirect.bind(this);
    this.stopAutoplay = this.stopAutoplay.bind(this);
    this.autoplay = this.autoplay.bind(this);
    this.onChangeEmitter = new EventEmitter();
  }

  supportTouchEvents() {
    return 'ontouchstart' in window;
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.init();
    }, 3000);
  }

  init() {
    this.swiper = this.swiperRef.nativeElement;
    this.container = this.swiperContainerRef.nativeElement as HTMLElement;
    this.items = this.itemsQuery.toArray().map(item => item.swiperItemContainer);

    this.supportedEvents = this.supportTouchEvents()
      ? CustomSwiperComponent.TOUCH_EVENTS
      : CustomSwiperComponent.MOUSE_EVENTS;

    this.index = 0;
    this.initDistance = 0;
    this.traveledDistance = 0;
    this.lastIndexToDisplay = this.getLastIndexToDisplay();

    // this.pages = this.getItemsPerPage();

    this.swiper.addEventListener(this.supportedEvents.down, this.actionDown);
    this.swiper.addEventListener(this.supportedEvents.click, this.cancelRedirect);

    window.addEventListener('resize', () => {
      setTimeout(this.update, 100);
    });

    this.initFeatures();
  }

  initFeatures() {
    if (this.options.showDots) {
      this.createDots();
    }

    if (this.options.loop) {
      this.createClones();

      if (this.options.autoplayMs) {
        this.startAutoplay();
      }
    }
  }

  update() {
    this.lastIndexToDisplay = this.getLastIndexToDisplay();

    // this.pages = this.getItemsPerPage();

    this.goToItem(this.index, false);

    if (this.options.showDots) {
      this.createDots();
    }

    if (this.options.loop) {
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
      if (this.options.reverse) {
        this.showPrev();
      } else {
        this.showNext();
      }
    }, this.options.autoplayMs);
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
      downEvent.preventDefault();
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

    if (Math.abs(this.firstPointY - distanceY) < 5) {
      this.swiper.addEventListener(this.supportedEvents.move, this.swipe);
      this.swiper.addEventListener(this.supportedEvents.up, this.actionUp);
    }

    this.swiper.removeEventListener(this.supportedEvents.move, this.activateSwipe);
  }

  actionUp(upEvent: any) {
    const distanceEvent = this.supportTouchEvents()
      ? upEvent.changedTouches[0].clientX
      : upEvent.screenX;

    this.traveledDistance = this.firstPointX - distanceEvent;

    const distance = this.traveledDistance + this.initDistance;

    for (let i = 0; i <= this.lastIndexToDisplay; i++) {
      const ajustDistance = (this.items[i].offsetWidth * CustomSwiperComponent.SWIPE_PERCENT_ADJUST) / 100;
      const minDistance = this.traveledDistance > 0
        ? this.items[i].offsetLeft + ajustDistance
        : this.items[i].offsetLeft + this.items[i].offsetWidth - ajustDistance;

      if (minDistance > distance || this.lastIndexToDisplay === i) {
        this.goToItem(i, true);

        break;
      }
    }

    this.swiper.removeEventListener(this.supportedEvents.move, this.swipe);
    this.swiper.removeEventListener(this.supportedEvents.up, this.actionUp);
  }

  swipe(moveEvent: any) {
    moveEvent.stopPropagation();
    moveEvent.preventDefault();

    const distanceEvent = this.supportTouchEvents()
      ? moveEvent.touches[0].clientX
      : moveEvent.screenX;

    let distance = this.firstPointX - distanceEvent + this.initDistance;
    const containerWidth = this.container.offsetWidth;
    const outRange = containerWidth / 100 * CustomSwiperComponent.SWIPE_OUT_PERCENT;
    const minDistance = outRange * -1;
    const maxDistance = outRange + this.containerFullWidth();

    if (distance < minDistance) {
      distance = minDistance;
    } else if (distance > maxDistance) {
      distance = maxDistance;
    }

    this.animate(distance, 0);
  }

  getLastIndexToDisplay(): number {
    let distance = 0;
    const totalItems = this.items.length - 1;

    for (let i = totalItems; i >= 0; i--) {
      distance = distance + this.items[i].offsetWidth;

      if (distance >= this.container.offsetWidth) {
        return i + 1;
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
    if (event && this.options.loop && this.supportTouchEvents()) {
      clearInterval(this.interval);

      this.autoplay();
    }
  }

  showPrev(event?: Event) {
    this.preventAutoplay(event);

    if (this.options.changePerPage) {
      // const currentPage = this.getPageByIndex(this.index);

      // this.goToPage(currentPage - 1);
    } else {
      this.goToItem(this.index - 1, true);
    }
  }

  showNext(event?: Event) {
    this.preventAutoplay(event);

    if (this.options.changePerPage) {
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

    this.items = Array.from(this.container.querySelectorAll('.swiper-item'));

    this.nextClonedItems = this.cloneDisplayedItemsInFirstPage();
    this.prevClonedItems = this.cloneDisplayedItemsInLastPage();

    this.items = Array.from(this.container.querySelectorAll('.swiper-item'));
    this.lastIndexToDisplay = this.getLastIndexToDisplay();

    // this.pages = this.getItemsPerPage();
    this.goToItem(this.prevClonedItems, false);
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
      ? this.options.animationMs
      : 0;

    if (index >= 0 && index < this.lastIndexToDisplay) {
      this.updateIndex(index);
      this.animate(this.items[index].offsetLeft, animationMs);

      const realLastIndex = this.items.length - this.nextClonedItems;

      if (this.options.loop && index >= realLastIndex) {
        this.moveToRealInit(index);
      } else if (this.options.loop && index < this.prevClonedItems) {
        this.moveToRealEnd(index);
      }
    }

    if (index >= this.lastIndexToDisplay && !this.options.loop) {
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
    }, this.options.animationMs);
  }

  moveToRealEnd(index: number) {
    setTimeout(() => {
      const realLastIndex = this.items.length - this.nextClonedItems;
      const realCurrentIndex = this.prevClonedItems - index;
      const endIndex = realLastIndex - realCurrentIndex;

      this.updateIndex(endIndex);
      this.animate(this.items[endIndex].offsetLeft, 0);
    }, this.options.animationMs);
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

  createDots() {
    // this.dots = [];

    // const firstPage = this.options.loop
    //   ? 1
    //   : 0;
    // const lastPage = this.options.loop
    //   ? this.pages.length - 1
    //   : this.pages.length;

    // for (let i = firstPage; i < lastPage; i++) {
    //   this.dots.push(i);
    // }
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
