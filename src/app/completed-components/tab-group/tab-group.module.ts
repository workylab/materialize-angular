import { CommonModule } from '@angular/common';
import { MaterializeCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';
import { TabComponent } from './tab/tab.component';
import { TabGroupComponent } from './tab-group.component';

@NgModule({
  declarations: [
    TabComponent,
    TabGroupComponent
  ],
  exports: [
    TabComponent,
    TabGroupComponent
  ],
  imports: [
    CommonModule,
    MaterializeCommonModule
  ]
})
export class MaterializeTabGroupModule {
}
