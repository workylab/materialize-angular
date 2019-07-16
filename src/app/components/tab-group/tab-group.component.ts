import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { config } from '../../config';
import { Router } from '@angular/router';
import { supportedEvents } from '../../utils/get-supported-events.util';
import { SupportedEventsModel } from '../common/models/supported-events.model';
import { TabComponent } from '../tab/tab.component';
import { TabGroupModel } from './tab-group.model';

@Component({
  selector: `${ config.components.prefix }-tab-group }`,
  styleUrls: ['./tab-group.component.scss'],
  templateUrl: './tab-group.component.html'
})
export class TabGroupComponent implements AfterContentInit, OnInit {
  static readonly defaultProps: TabGroupModel = {
    className: '',
    selectedIndex: 0,
    transitionDuration: 450
  };

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChild('tabsIndicator') tabsIndicatorRef: ElementRef;
  @ViewChild('tabsHeader') tabsHeader: ElementRef;

  @Input('className') classNameInput: string;
  @Input('selectedIndex') selectedIndexInput: number;
  @Input('transitionDuration') transitionDurationInput: number;

  public className: string;
  public selectedIndex: number;
  public supportedEvents: SupportedEventsModel;
  public transitionDuration: number;

  constructor(private router: Router, private renderer: Renderer2) {
    this.supportedEvents = supportedEvents();

    this.update = this.update.bind(this);

    window.addEventListener(this.supportedEvents.resize, this.update);
  }

  ngOnInit() {
    this.initValues();
  }

  ngAfterContentInit() {
    setTimeout(this.update, 0);
  }

  initValues() {
    const { defaultProps } = TabGroupComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.selectedIndex = this.selectedIndexInput || defaultProps.selectedIndex;
    this.transitionDuration = this.transitionDurationInput || defaultProps.transitionDuration;
  }

  selectTab(index: number, tab: TabComponent) {
    const tabs = this.tabs.toArray();

    if (tabs[index].disabled) {
      return;
    }

    this.selectedIndex = index;
    this.moveIndicator(this.selectedIndex, true);

    if (tab.link) {
      setTimeout(() => {
        this.router.navigate([tab.link]);
      }, this.transitionDuration);
    }
  }

  update() {
    this.moveIndicator(this.selectedIndex, false);
  }

  activateIndex(index: number) {
    this.tabs.forEach((tab, i) => {
      tab.isActive = i === index;
    });
  }

  moveIndicator(index: number, hasAnimation: boolean) {
    this.activateIndex(index);

    const { nativeElement } = this.tabsIndicatorRef;
    const child = this.tabsHeader.nativeElement.children[index];
    const transitionDuration = hasAnimation
      ? `${ this.transitionDuration }ms`
      : null;

    this.renderer.setStyle(nativeElement, 'transitionDuration', transitionDuration);
    this.renderer.setStyle(nativeElement, 'width', `${ child.offsetWidth }px`);
    this.renderer.setStyle(nativeElement, 'transform', `translateX(${ child.offsetLeft }px)`);
  }
}
