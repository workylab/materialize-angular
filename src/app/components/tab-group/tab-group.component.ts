import { AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TabComponent } from '../tab/tab.component';
import { TabGroupModel } from './tab-group.model';

@Component({
  selector: 'materialize-tab-group',
  styleUrls: ['./tab-group.component.scss'],
  templateUrl: './tab-group.component.html'
})
export class TabGroupComponent implements AfterContentInit {
  static readonly defaultProps: TabGroupModel = {
    className: '',
    selectedIndex: 0,
    transitionDuration: 450
  };

  @ContentChildren(TabComponent) tabComponentList: QueryList<TabComponent>;

  @ViewChild('tabsIndicator') tabsIndicatorRef: ElementRef;
  @ViewChild('tabsHeader') tabsHeader: ElementRef;

  @Input('className') classNameInput: string;
  @Input('selectedIndex') selectedIndexInput: number;
  @Input('transitionDuration') transitionDurationInput: number;

  public className: string;
  public selectedIndex: number;
  public tabs: Array<TabComponent>;
  public transitionDuration: number;

  constructor(private router: Router) {
    this.initValues = this.initValues.bind(this);
  }

  ngAfterContentInit() {
    setTimeout(this.initValues, 0);
  }

  initValues() {
    const { defaultProps } = TabGroupComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.selectedIndex = this.selectedIndexInput || defaultProps.selectedIndex;
    this.tabs = this.tabComponentList.toArray();
    this.transitionDuration = this.transitionDurationInput || defaultProps.transitionDuration;

    this.activateIndex(this.selectedIndex);
    this.moveIndicator(this.selectedIndex, false);
  }

  selectTab(index: number, tab: TabComponent) {
    if (this.tabs[index].disabled) {
      return;
    }

    this.selectedIndex = index;

    this.activateIndex(this.selectedIndex);
    this.moveIndicator(this.selectedIndex, true);

    if (tab.link) {
      setTimeout(() => {
        this.router.navigate([tab.link]);
      }, this.transitionDuration);
    }
  }

  activateIndex(index: number) {
    for (const tab of this.tabs) {
      tab.isActive = false;
    }

    this.tabs[index].isActive = true;
  }

  moveIndicator(index: number, hasAnimation: boolean) {
    const child = this.tabsHeader.nativeElement.children[index];
    const { style } = this.tabsIndicatorRef.nativeElement;

    style.transitionDuration = hasAnimation
      ? `${ this.transitionDuration }ms`
      : null;

    style.width = `${ child.offsetWidth }px`;
    style.transform = `translateX(${ child.offsetLeft }px)`;
  }
}
