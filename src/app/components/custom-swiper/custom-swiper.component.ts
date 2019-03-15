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

  private container: HTMLElement;
  private dots: Array<number> = [];
  private firstPointX: number;
  private firstPointY: number;
  private index: number;
  private initDistance: number;
  private interval: number;
  private items: Array<HTMLElement>;
  private lastIndexToDisplay: number;
  private pages: number[];
  private supportedEvents: CustomSwiperEvents;
  private swiper: HTMLElement;
  private traveledDistance: number;

  private options: CustomSwiperOptions = {
    animationMs: 300,
    autoplay: false,
    autoplayMs: 1000,
    changePerPage: true,
    loop: false,
    showDots: true
  };

  constructor(private swiperElementRef: ElementRef) {
    this.swiper = this.swiperElementRef.nativeElement;
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
    this.container = this.swiperContainerRef.nativeElement as HTMLElement;
    this.items = this.itemsQuery.toArray().map(item => item.swiperItemContainer);

    this.supportedEvents = this.supportTouchEvents()
      ? CustomSwiperComponent.TOUCH_EVENTS
      : CustomSwiperComponent.MOUSE_EVENTS;

    this.index = 0;
    this.initDistance = 0;
    this.traveledDistance = 0;
    this.lastIndexToDisplay = this.getLastIndexToDisplay();
    this.pages = this.getItemsPerPage();

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

      if (this.options.autoplay) {
        this.startAutoplay();
      }
    }
  }

  update() {
    this.lastIndexToDisplay = this.getLastIndexToDisplay();
    this.pages = this.getItemsPerPage();

    if (this.index < this.lastIndexToDisplay) {
      const currentItem = this.items[this.index] as HTMLElement;

      this.animate(currentItem.offsetLeft, 0);
    } else {
      this.updateIndex(this.lastIndexToDisplay);
      this.animate(this.containerFullWidth(), 0);
    }

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

  goToPage(pageNumber: number): void {
    let firstItemPage = 0;

    for (let i = 0; i < pageNumber; i++) {
      firstItemPage = firstItemPage + this.pages[i];
    }

    if (firstItemPage < this.lastIndexToDisplay) {
      const firstItemPageDistance = this.items[firstItemPage].offsetLeft;

      this.animate(firstItemPageDistance, this.options.animationMs);
      this.updateIndex(firstItemPage);
    } else {
      this.animate(this.containerFullWidth(), this.options.animationMs);
      this.updateIndex(this.lastIndexToDisplay);
    }
  }

  getCurrentPage(index: number): number {
    let itemsInCurrentPage = 0;
    const nextIndex = index + 1;

    for (let i = 0; i < this.items.length; i++) {
      itemsInCurrentPage = itemsInCurrentPage + this.pages[i];

      if (itemsInCurrentPage >= nextIndex) {
        return i;
      }
    }

    return 0;
  }

  autoplay() {
    this.swiper.removeEventListener(this.supportedEvents.out, this.autoplay);

    this.interval = window.setInterval(() => {
      this.showNext();
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

  getItemsPerPage(): Array<number> {
    const pageItems = [];
    let distance = 0;
    let itemsCounter = 1;

    for (let i = 0; i < this.items.length; i++) {
      distance = distance + this.items[i].offsetWidth;

      if (distance > this.container.offsetWidth) {
        if (distance < this.container.offsetWidth + this.items.length) {
          pageItems.push(itemsCounter);
          distance = 0;
          itemsCounter = 0;
        } else {
          pageItems.push(itemsCounter - 1);
          distance = this.items[i].offsetWidth;
          itemsCounter = 1;
        }
      }

      if (i === this.items.length - 1 && itemsCounter > 0) {
        pageItems.push(itemsCounter);
      }

      itemsCounter++;
    }

    return pageItems;
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
      const item = this.items[i] as HTMLElement;
      const ajustDistance = (item.offsetWidth * CustomSwiperComponent.SWIPE_PERCENT_ADJUST) / 100;
      const minDistance = this.traveledDistance > 0
        ? item.offsetLeft + ajustDistance
        : item.offsetLeft + item.offsetWidth - ajustDistance;

      if (i < this.lastIndexToDisplay && minDistance > distance) {
        this.animate(item.offsetLeft, this.options.animationMs);
        this.updateIndex(i);

        break;
      } else if (i === this.lastIndexToDisplay) {
        this.animate(this.containerFullWidth(), this.options.animationMs);
        this.updateIndex(this.lastIndexToDisplay);
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
      const item = this.items[i] as HTMLElement;

      distance = distance + item.offsetWidth;

      if (distance > this.container.offsetWidth) {
        if (distance < this.container.offsetWidth + totalItems) {
          return i;
        }

        return i + 1;
      }
    }

    return totalItems;
  }

  createDots(): void {
    this.dots = [];

    const firstPage = this.options.loop
      ? 1
      : 0;
    const lastPage = this.options.loop
      ? this.pages.length - 1
      : this.pages.length;

    for (let i = firstPage; i < lastPage; i++) {
      this.dots.push(i);
    }
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

  showPrev(event?: Event): void {
    if (event && this.options.loop && this.supportTouchEvents()) {
      clearInterval(this.interval);

      this.autoplay();
    }

    if (this.index > 0 && this.options.changePerPage) {
      const currentPage = this.getCurrentPage(this.index);
      const previousPage = currentPage - 1;

      this.goToPage(previousPage);

      return;
    }

    // if (this.index > 0 && !this.options.changePerPage) {
    //   const previuosIndex = this.index - 1;
    //   const currentItem = this.items[previuosIndex];

    //   this.updateIndex(previuosIndex);
    //   this.animate(currentItem.offsetLeft, this.options.animationMs);

    //   return;
    // }

    const amountFirstPage = this.pages[0];

    if (this.options.loop && this.index === amountFirstPage) {
      this.animate(this.containerFullWidth(), 0);
      this.updateIndex(this.lastIndexToDisplay);
      this.showPrev();
    }
  }

  showNext(event?: Event): void {
    if (event && this.options.loop && this.supportTouchEvents()) {
      clearInterval(this.interval);

      this.autoplay();
    }

    const amountLastPage = this.pages[this.pages.length - 1];
    const something = amountLastPage * 2;
    const somethingElse = this.items.length - something;

    // if (this.options.loop && this.index >= somethingElse) {
    //   this.animate(0, 0);
    //   this.updateIndex(0);
    //   this.showNext();

    //   return;
    // }

    const newIndex = this.index + 1;

    if (newIndex <= this.lastIndexToDisplay) {
      if (this.options.changePerPage) {
        const page = this.getCurrentPage(this.index);

        this.goToPage(page + 1);
      } else {
        this.updateIndex(newIndex);

        if (newIndex < this.lastIndexToDisplay) {
          const currentItem = this.items[newIndex] as HTMLElement;

          this.animate(currentItem.offsetLeft, this.options.animationMs);
        } else {
          this.animate(this.containerFullWidth(), this.options.animationMs);
        }
      }
    }
  }

  createClones(): void {
    const clons = this.container.querySelectorAll('.cloned');

    for (let i = 0; i < clons.length; i++) {
      const currentItem = clons[i] as HTMLElement;

      if (currentItem.parentNode) {
        currentItem.parentNode.removeChild(currentItem);
      }
    }

    const amountFirstPage = this.pages[0];
    const amountLastPage = this.pages[this.pages.length - 1];
    const lastItem = this.items.length - 1;
    const lastItemToClone = lastItem - amountLastPage;

    for (let i = 0; i <= amountFirstPage; i++) {
      const clonedItem = this.items[i].cloneNode(true) as HTMLElement;

      clonedItem.classList.add('cloned');

      this.container.appendChild(clonedItem);
    }

    for (let i = lastItem; i > lastItemToClone; i--) {
      const clonedItem = this.items[i].cloneNode(true) as HTMLElement;

      clonedItem.classList.add('cloned');

      this.container.insertBefore(clonedItem, this.container.firstChild);
    }

    const items = this.container.querySelectorAll('.swiper-item');
    const newItems = [] as Array<HTMLElement>;

    for (let i = 0; i < items.length; i++) {
      newItems.push(items[i] as HTMLElement);
    }

    this.items = newItems;
    this.lastIndexToDisplay = this.getLastIndexToDisplay();
    this.pages = this.getItemsPerPage();

    // this.goToPage(1, 0);
  }
}
