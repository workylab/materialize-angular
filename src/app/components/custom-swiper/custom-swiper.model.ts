export interface CustomSwiperEvents {
  click: string;
  down: string;
  move: string;
  out: string;
  up: string;
}

export interface CustomSwiperOptions {
  animationMs: number;
  autoplayMs: number;
  changePerPage: boolean;
  loop: boolean;
  reverse: boolean;
  showDots: boolean;
}
