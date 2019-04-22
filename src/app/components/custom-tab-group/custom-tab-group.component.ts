import { AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { CustomTabComponent } from '../custom-tab/custom-tab.component';
import { CustomTabGroup } from './custom-tab-group.model';

@Component({
  selector: 'custom-tab-group',
  templateUrl: './custom-tab-group.component.html'
})
export class CustomTabGroupComponent implements AfterContentInit {
  static readonly defaultProps: CustomTabGroup = {
    className: '',
    selectedIndexInput: 0
  };

  @ContentChildren(CustomTabComponent) tabComponentList: QueryList<CustomTabComponent>;

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
    const { defaultProps } = CustomTabGroupComponent;

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
