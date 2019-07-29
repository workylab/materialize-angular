import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { config } from '../../config';
import { GlossaryItemComponent } from '../glossary-item/glossary-item.component';
import { GlossaryModel } from './glossary.model';

@Component({
  selector: `${ config.components.prefix }-glossary`,
  templateUrl: './glossary.component.html'
})
export class GlossaryComponent implements AfterContentInit, GlossaryModel {
  static readonly defaultProps: GlossaryModel = {
    className: '',
    scrollSpy: null
  };

  @ContentChildren(GlossaryItemComponent) items: QueryList<GlossaryItemComponent>;

  @Input() className = GlossaryComponent.defaultProps.className;
  @Input() scrollSpy = GlossaryComponent.defaultProps.scrollSpy;

  public prefix = config.components.prefix;

  public activeReferenceId = '';

  constructor(private router: Router) {
    this.onClickItem = this.onClickItem.bind(this);
    this.registerOptions = this.registerOptions.bind(this);
    this.update = this.update.bind(this);
  }

  ngAfterContentInit() {
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
      element.scrollIntoView({ behavior: 'smooth', block: 'start'});
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
    const { segments } = routerTree.root.children.primary;
    const urlWithoutParams = segments.map(segment => segment.path);

    this.router.navigate(urlWithoutParams, { fragment: referenceId });
  }

  activeItemByReferenceId(referenceId: string) {
    this.items.forEach(item => {
      item.isActive = item.referenceId === referenceId;
    });
  }
}
