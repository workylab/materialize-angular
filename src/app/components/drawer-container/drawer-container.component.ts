import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'materialize-drawer-container',
  templateUrl: './drawer-container.component.html'
})
export class DrawerContainerComponent {
  constructor(private elementRef: ElementRef) {
  }
}
