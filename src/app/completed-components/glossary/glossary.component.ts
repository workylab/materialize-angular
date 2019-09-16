import { AfterViewInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { config } from '../../config';
import { getOffseTop } from '../../utils/get-offset-top.util';
import { GlossaryItemComponent } from './glossary-item/glossary-item.component';
import { GlossaryModel } from './glossary.model';
import { Router } from '@angular/router';

@Component({
  selector: `${ config.components.prefix }-glossary`,
  templateUrl: './glossary.component.html'
})
export class GlossaryComponent implements AfterViewInit, GlossaryModel {
  static readonly defaultProps: GlossaryModel = {
    className: '',
    scrollSpy: null,
    topSpace: 0
  };

  @ContentChildren(GlossaryItemComponent) items: QueryList<GlossaryItemComponent>;

  @Input() className = GlossaryComponent.defaultProps.className;
  @Input() scrollSpy = GlossaryComponent.defaultProps.scrollSpy;
  @Input() topSpace = GlossaryComponent.defaultProps.topSpace;

  public prefix = config.components.prefix;

  public activeReferenceId = '';

  constructor(private router: Router) {
    this.onClickItem = this.onClickItem.bind(this);
    this.registerOptions = this.registerOptions.bind(this);
    this.update = this.update.bind(this);
  }

  ngAfterViewInit() {
    this.registerOptions();

    setTimeout(this.update, 30);

    if (this.scrollSpy) {
      this.scrollSpy.onChangeEmitter.subscribe((referenceId: string) => {
        this.activeReferenceId = referenceId;

        this.activeItemByReferenceId(referenceId);
      });
    }
  }

  update() {
    this.activeReferenceId = this.getActiveReferenceId();

    this.activeItemByReferenceId(this.activeReferenceId);

    this.scrollTo(this.activeReferenceId);
  }

  scrollTo(referenceId: string) {
    const element = document.getElementById(referenceId);

    if (element) {
      const elementOffsetTop = getOffseTop(element);
      const scrollTop = elementOffsetTop - this.topSpace;

      setTimeout(() => window.scrollTo(0, scrollTop), 150);
    }
  }

  getActiveReferenceId(): string {
    const routerTree = this.router.parseUrl(this.router.url);

    if (routerTree && routerTree.fragment) {
      return routerTree.fragment;
    }

    return '';
  }

  registerOptions() {
    this.items.forEach(item => {
      item.onClickEmitter.subscribe(this.onClickItem);
    });
  }

  onClickItem(referenceId: string) {
    this.activeReferenceId = referenceId;

    this.activeItemByReferenceId(referenceId);
    this.scrollTo(referenceId);

    const routerTree = this.router.parseUrl(this.router.url);
    const { primary } = routerTree.root.children;

    const urlWithoutParams = primary
      ? primary.segments.map(segment => segment.path)
      : routerTree.root.segments.map(segment => segment.path);

    this.router.navigate(urlWithoutParams, { fragment: referenceId });
  }

  activeItemByReferenceId(referenceId: string) {
    this.items.forEach(item => {
      item.isActive = item.referenceId === referenceId;
    });
  }
}
