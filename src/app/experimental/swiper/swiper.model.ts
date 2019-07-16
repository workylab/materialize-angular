export interface SwiperEventsModel {
  click: string;
  down: string;
  move: string;
  out: string;
  up: string;
}

export interface SwiperModel {
  animationMs: number;
  autoplayMs: number;
  className: string;
  displayControls: boolean;
  displayDots: boolean;
  isAutoplay: boolean;
  isCarousel: boolean;
  isChangePerPage: boolean;
  isReverse: boolean;
  itemSwipePercentAdjust: number;
  maxSwipeOutPercent: number;
}
