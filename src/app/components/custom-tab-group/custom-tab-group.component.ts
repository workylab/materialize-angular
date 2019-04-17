import { Component, ContentChildren, QueryList } from '@angular/core';
import { CustomTabComponent } from '../custom-tab/custom-tab.component';

@Component({
  selector: 'custom-tab-group',
  templateUrl: './custom-tab-group.component.html'
})
export class CustomTabGroupComponent {
  @ContentChildren(CustomTabComponent) tabComponentList: QueryList<CustomTabComponent>;

  ngAfterContentInit() {
    const activeTabs = this.tabComponentList.filter(item => item.isActive);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabComponentList.first);
    }
  }

  selectTab(tabComponent: CustomTabComponent) {
    this.tabComponentList.toArray().forEach(item => {
      item.isActive = false;
    });

    tabComponent.isActive = true;
  }
}
