import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {config} from '../../config';
import {Router} from '@angular/router';
import {supportedEvents} from '../../utils/get-supported-events.util';
import {SupportedEventsModel} from '../../components/common/models/supported-events.model';
import {TabComponent} from './tab/tab.component';
import {TabGroupModel} from './tab-group.model';

@Component({
  selector: `${ config.components.prefix }-tab-group }`,
  templateUrl: './tab-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent implements AfterContentInit, OnChanges {
  static readonly defaultProps: TabGroupModel = {
    className: '',
    selectedIndex: 0,
    transitionDuration: 450
  };

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChild('indicator', { static: true }) indicatorRef: ElementRef;
  @ViewChild('header', { static: true }) headerRef: ElementRef;

  @Output('onSelectTab') onTabSelectEmitter: EventEmitter<number>;

  @Input() className: string = TabGroupComponent.defaultProps.className;
  @Input() selectedIndex: number = TabGroupComponent.defaultProps.selectedIndex;
  @Input() transitionDuration: number = TabGroupComponent.defaultProps.transitionDuration;

  public selectedIndexInner: number;
  public prefix = config.components.prefix;
  public supportedEvents: SupportedEventsModel;

  constructor(private router: Router, private renderer: Renderer2) {
    this.onTabSelectEmitter = new EventEmitter<number>();
    this.supportedEvents = supportedEvents();

    this.update = this.update.bind(this);

    window.addEventListener(this.supportedEvents.resize, this.update);
  }

  ngAfterContentInit(): void {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedIndex) {
      this.selectedIndexInner = changes.selectedIndex.currentValue;
      if (!changes.selectedIndex.isFirstChange()) {
        this.moveIndicator(this.selectedIndexInner, true);
      }
    }
  }

  update() {
    setTimeout(() => {
      this.moveIndicator(this.selectedIndexInner, false);
    }, 150);
  }

  selectTab(index: number) {
    const tabs = this.tabs.toArray();
    const selectedTab = tabs[index];

    if (!selectedTab.disabled) {
      this.selectedIndexInner = index;

      this.onTabSelectEmitter.emit(index);
      this.moveIndicator(this.selectedIndexInner, true);

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

    // After index activation, the tabs sizes could change
    setTimeout(() => {
      const child = this.headerRef.nativeElement.children[index];
      const transitionDuration = hasAnimation
        ? `${this.transitionDuration}ms`
        : null;

      this.renderer.setStyle(this.indicatorRef.nativeElement, 'transitionDuration', transitionDuration);
      this.renderer.setStyle(this.indicatorRef.nativeElement, 'width', `${child.offsetWidth}px`);
      this.renderer.setStyle(this.indicatorRef.nativeElement, 'transform', `translateX(${child.offsetLeft}px)`);
    }, 0);
  }
}
