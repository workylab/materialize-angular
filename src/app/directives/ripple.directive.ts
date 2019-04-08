import { Directive, ElementRef } from '@angular/core';

interface Coordinate {
  x: number;
  y: number;
}

@Directive({
  selector: '[customRipple]'
})
export class CustomRippleDirective {
  private element: HTMLElement;
  private duration = 500;

  constructor(private elementRef: ElementRef) {
    this.createRipple = this.createRipple.bind(this);

    this.element = this.elementRef.nativeElement;
    this.element.classList.add('ripple-element');
    this.element.addEventListener('mousedown', this.createRipple);
  }

  createRipple(event: any): void {
    const ripple = document.createElement('div');
    const coordinates = this.getCoordinates(event);
    const radio = this.getRippleRadio(coordinates);

    ripple.classList.add('ripple');

    ripple.style.height = `${ radio * 2 }px`;
    ripple.style.width = `${ radio * 2 }px`;
    ripple.style.top = `${ coordinates.y - radio }px`;
    ripple.style.left = `${ coordinates.x - radio }px`;

    this.element.insertBefore(ripple, this.element.firstChild);

    this.scaleRipple(ripple);
  }

  getCoordinates(event: any): Coordinate {
    const offset = this.getOffset(this.element);

    const y = event.pageY - offset.top;
    const x = event.pageX - offset.left;

    return { x, y };
  }

  getRippleRadio(coordinate: Coordinate): number {
    const height = Math.max(this.element.offsetHeight - coordinate.y, coordinate.y);
    const width = Math.max(this.element.offsetWidth - coordinate.x, coordinate.x);

    const radio = Math.hypot(height, width);

    return radio;
  }

  scaleRipple(ripple: HTMLElement): void {
    setTimeout(() => {
      ripple.style.transitionDuration = `${ this.duration }ms`;
      ripple.style.transform = 'scale(1)';

      this.hideRipple(ripple);
    }, 0);
  }

  hideRipple(ripple: HTMLElement): void {
    const timeToHide = 450;

    setTimeout(() => {
      ripple.style.transitionDuration = `${ timeToHide }ms`;
      ripple.style.opacity = '0';

      this.removeRipple(ripple, timeToHide);
    }, this.duration);
  }

  removeRipple(ripple: HTMLElement, time: number): void {
    setTimeout(() => {
      this.element.removeChild(ripple);
    }, time);
  }

  getOffset(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

    const offset = {
      left: rect.left + left,
      top: rect.top + top
    };

    return offset;
  }
}
