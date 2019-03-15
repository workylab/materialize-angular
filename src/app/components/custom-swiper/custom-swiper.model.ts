export interface CustomSwiperEvents {
  click: string;
  down: string;
  move: string;
  out: string;
  up: string;
}

export interface CustomSwiperOptions {
  animationMs: number;
  autoplay: boolean;
  autoplayMs: number;
  changePerPage: boolean;
  loop: boolean;
  showDots: boolean;
}
