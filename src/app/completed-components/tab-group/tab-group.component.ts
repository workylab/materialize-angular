import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { config } from '../../config';
import { Router } from '@angular/router';
import { supportedEvents } from '../../utils/get-supported-events.util';
import { SupportedEventsModel } from '../../components/common/models/supported-events.model';
import { TabComponent } from '../tab/tab.component';
import { TabGroupModel } from './tab-group.model';

@Component({
  selector: `${ config.components.prefix }-tab-group }`,
  templateUrl: './tab-group.component.html'
})
export class TabGroupComponent implements AfterContentInit {
  static readonly defaultProps: TabGroupModel = {
    className: '',
    selectedIndex: 0,
    transitionDuration: 450
  };

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChild('indicator', { static: true }) indicatorRef: ElementRef;
  @ViewChild('header', { static: true }) headerRef: ElementRef;

  @Input() className: string = TabGroupComponent.defaultProps.className;
  @Input() selectedIndex: number = TabGroupComponent.defaultProps.selectedIndex;
  @Input() transitionDuration: number = TabGroupComponent.defaultProps.transitionDuration;

  public prefix = config.components.prefix;
  public supportedEvents: SupportedEventsModel;

  constructor(private router: Router, private renderer: Renderer2) {
    this.supportedEvents = supportedEvents();

    this.update = this.update.bind(this);

    window.addEventListener(this.supportedEvents.resize, this.update);
  }

  ngAfterContentInit() {
    setTimeout(this.update, 500);
  }

  update() {
    this.moveIndicator(this.selectedIndex, false);
  }

  selectTab(index: number) {
    const tabs = this.tabs.toArray();
    const selectedTab = tabs[index];

    if (!selectedTab.disabled) {
      this.selectedIndex = index;
      this.moveIndicator(this.selectedIndex, true);

      if (selectedTab.link) {
        setTimeout(() => {
          this.router.navigate([selectedTab.link]);
        }, this.transitionDuration);
      }
    }
  }

  activateIndex(index: number) {
    this.tabs.forEach((tab, i) => {
      tab.isActive = i === index;
    });
  }

  moveIndicator(index: number, hasAnimation: boolean) {
    this.activateIndex(index);

    const child = this.headerRef.nativeElement.children[index];
    const transitionDuration = hasAnimation
      ? `${ this.transitionDuration }ms`
      : null;

    this.renderer.setStyle(this.indicatorRef.nativeElement, 'transitionDuration', transitionDuration);
    this.renderer.setStyle(this.indicatorRef.nativeElement, 'width', `${ child.offsetWidth }px`);
    this.renderer.setStyle(this.indicatorRef.nativeElement, 'transform', `translateX(${ child.offsetLeft }px)`);
  }
}
