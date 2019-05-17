import { AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
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
    selectedIndexInput: 0
  };

  @ContentChildren(TabComponent) tabComponentList: QueryList<TabComponent>;

  @ViewChild('tabsIndicator') tabsIndicatorRef: ElementRef;
  @ViewChild('tabsHeader') tabsHeader: ElementRef;

  @Input('className') classNameInput: string;
  @Input('selectedIndex') selectedIndexInput: number;

  public className: string;
  public selectedIndex: number;

  constructor() {
    this.initValues = this.initValues.bind(this);
  }

  ngAfterContentInit() {
    setTimeout(this.initValues, 500);
  }

  initValues() {
    const { defaultProps } = TabGroupComponent;

    this.className = this.classNameInput || defaultProps.className;
    this.selectedIndex = this.selectedIndexInput || defaultProps.selectedIndexInput;

    this.selectTab(this.selectedIndex);
  }

  selectTab(newIndex: number) {
    this.selectedIndex = newIndex;

    this.activateIndex(this.selectedIndex);

    const child = this.tabsHeader.nativeElement.children[this.selectedIndex];
    const { style } = this.tabsIndicatorRef.nativeElement;

    style.width = `${ child.offsetWidth }px`;
    style.transform = `translateX(${ child.offsetLeft }px)`;
  }

  activateIndex(index: number) {
    const tabList = this.tabComponentList.toArray();

    for (const tab of tabList) {
      tab.isActive = false;
    }

    tabList[index].isActive = true;
  }
}
