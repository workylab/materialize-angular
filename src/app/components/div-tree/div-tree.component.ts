import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'div-tree',
  templateUrl: './div-tree.component.html'
})
export class DivTreeComponent {
  @Input() classNames: Array<string>;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    const firstChild = this.element.nativeElement.children[0];
    const divTree = this.createdNested(this.classNames, firstChild);

    this.element.nativeElement.appendChild(divTree);
  }

  createdNested(classNames: Array<string>, child: HTMLElement): HTMLElement {
    let content = child;

    if (classNames.length > 1) {
      const newClassNames = classNames.slice(1, classNames.length);

      content = this.createdNested(newClassNames, child);
    }

    const container: HTMLElement = this.renderer.createElement('div');

    container.className = classNames[0];
    container.appendChild(content);

    return container;
  }
}
