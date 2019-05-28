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
    selectedIndex: 0
  };

  @ContentChildren(TabComponent) tabComponentList: QueryList<TabComponent>;

  @ViewChild('tabsIndicator') tabsIndicatorRef: ElementRef;
  @ViewChild('tabsHeader') tabsHeader: ElementRef;

  @Input('className') classNameInput: string;
  @Input('selectedIndex') selectedIndexInput: number;

  public className: string;
  public selectedIndex: number;

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

    this.activateIndex(this.selectedIndex);
  }

  selectTab(newIndex: number, tab: TabComponent) {
    this.selectedIndex = newIndex;

    this.activateIndex(this.selectedIndex);

    if (tab.link) {
      this.router.navigate([tab.link]);
    }
  }

  activateIndex(index: number) {
    const tabList = this.tabComponentList.toArray();

    for (const tab of tabList) {
      tab.isActive = false;
    }

    tabList[index].isActive = true;

    this.moveIndicator(index);
  }

  moveIndicator(index: number) {
    const child = this.tabsHeader.nativeElement.children[index];
    const { style } = this.tabsIndicatorRef.nativeElement;

    style.width = `${ child.offsetWidth }px`;
    style.transform = `translateX(${ child.offsetLeft }px)`;
  }
}
