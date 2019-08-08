import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

interface Coordinate {
  x: number;
  y: number;
}

@Directive({
  selector: '[materializeRipple]'
})
export class RippleDirective implements OnInit {
  @Input() rippleDuration = 500;
  @Input() isRippleActive = true;
  @Input() isRippleCenter = false;

  private element: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.createRipple = this.createRipple.bind(this);

    this.element = this.elementRef.nativeElement;
    this.renderer.addClass(this.element, 'ripple-element');
  }

  ngOnInit() {
    if (!this.isRippleActive) {
      this.renderer.addClass(this.element, 'ripple-disabled');
    }
  }

  @HostListener('mousedown', ['$event'])
  createRipple(event: any): void {
    if (!this.isRippleActive) {
      return;
    }

    const coordinates = this.isRippleCenter
      ? this.getCoordinatesByCenter()
      : this.getCoordinatesByEvent(event);

    const radio = this.getRippleRadio(coordinates);

    this.renderRipple(radio, coordinates);
  }

  renderRipple(radio: number, coordinate: Coordinate) {
    const ripple = this.renderer.createElement('div');
    const centerY = coordinate.y - radio;
    const centerX = coordinate.x - radio;

    this.renderer.addClass(ripple, 'ripple');

    this.renderer.setStyle(ripple, 'height', `${ radio * 2 }px`);
    this.renderer.setStyle(ripple, 'width', `${ radio * 2 }px`);
    this.renderer.setStyle(ripple, 'top', `${ centerY }px`);
    this.renderer.setStyle(ripple, 'left', `${ centerX }px`);
    this.renderer.insertBefore(this.element, ripple, this.element.firstChild);

    this.scaleRipple(ripple);
  }

  getCoordinatesByCenter() {
    const { offsetHeight, offsetWidth } = this.element;
    const y = offsetHeight / 2;
    const x = offsetWidth / 2;

    return { x, y };
  }

  getCoordinatesByEvent(event: any): Coordinate {
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
      ripple.style.transitionDuration = `${ this.rippleDuration }ms`;
      ripple.style.transform = 'scale(1)';

      this.hideRipple(ripple);
    }, 0);
  }

  hideRipple(ripple: HTMLElement): void {
    setTimeout(() => {
      this.renderer.setStyle(ripple, 'transitionDuration', `${ this.rippleDuration }ms`);
      this.renderer.setStyle(ripple, 'opacity', '0');

      this.removeRipple(ripple);
    }, this.rippleDuration);
  }

  removeRipple(ripple: HTMLElement): void {
    setTimeout(() => {
      this.renderer.removeChild(this.element, ripple);
    }, this.rippleDuration);
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
